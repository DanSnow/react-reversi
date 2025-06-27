import type { Point, Users } from '~/types'
import type { GameEmittedEvents } from '~/types/events'
import { pipe } from 'effect'
import invariant from 'tiny-invariant'
import { assertEvent, assign, emit, setup } from 'xstate'
import { createAIActor } from '~/actor/ai'
import { DEFAULT_AI_VERSION } from '~/lib/ai/core'
import { clearBoardCandidate, countCandidate, placeBoardCandidate } from '~/lib/board'
import { getOpposite } from '~/lib/chess-utils'
import { Board, DEFAULT_USER, getUserType, Player, UserType } from '~/types'

// 1. Update GameEvents: Add 'undo'
export type GameEvents =
  | { type: 'start'; users: Users }
  | { type: 'placed'; point: Point; nextBoard: Board.Board }
  | { type: 'restart' }
  | { type: 'undo' } // Added undo event

export const gameMachine = setup({
  types: {
    context: {} as {
      board: Board.Board
      users: Users
      switchCount: number
      currentPlayer: Player.Player
      // 2. Update Context: Add boardHistory
      boardHistory: Board.Board[] // Added board history
    },
    events: {} as GameEvents,
    emitted: {} as GameEmittedEvents,
  },
  actions: {
    initialGame: assign({
      board: () => Board.DEFAULT_BOARD,
      users: ({ event }) => {
        assertEvent(event, 'start')
        return event.users
      },
      // Initialize boardHistory
      boardHistory: [],
    }),
    resetGame: assign({
      board: Board.DEFAULT_BOARD,
      users: DEFAULT_USER,
      // Reset boardHistory
      boardHistory: [],
    }),
    placeCandidate: assign({
      board: ({ context }) => {
        const { board } = pipe(context.board, clearBoardCandidate, (board) =>
          placeBoardCandidate({
            board,
            player: context.currentPlayer,
          }),
        )

        return board
      },
    }),
    resetSwitch: assign({
      switchCount: 0,
    }),
    switchPlayer: assign({
      currentPlayer: ({ context }) => getOpposite(context.currentPlayer),
    }),
    increaseSwitch: assign({
      switchCount: ({ context }) => context.switchCount + 1,
    }),
    // 3. Modify setBoard: Push current board to history before updating
    setBoard: assign({
      board: ({ event }) => {
        invariant(event.type === 'placed')
        return event.nextBoard
      },
      boardHistory: ({ context }) => {
        // Push the current board state before it's updated
        return [...context.boardHistory, context.board]
      },
    }),
    // 4. Create revertTurn action
    revertTurn: assign({
      board: ({ context }) => {
        // Need at least two history entries to revert two moves
        if (context.boardHistory.length < 2) {
          console.warn('Cannot undo: not enough history.') // Add a warning or error handling
          return context.board // Keep current board if not enough history
        }
        // Pop the last two boards
        const newHistory = [...context.boardHistory]
        newHistory.pop() // Remove the board state before the last move
        const previousBoard = newHistory.pop() // Get the board state before the second-to-last move
        return previousBoard || context.board // Use previousBoard if available, otherwise current board
      },
      boardHistory: ({ context }) => {
        // Need at least two history entries to revert two moves
        if (context.boardHistory.length < 2) {
          return context.boardHistory // Keep current history
        }
        // Pop the last two boards
        const newHistory = [...context.boardHistory]
        newHistory.pop() // Remove the board state before the last move
        newHistory.pop() // Remove the board state before the second-to-last move
        return newHistory
      },
      currentPlayer: ({ context }) => {
        // Reverting two moves means going back to the state where the player
        // who is currently active (the one who triggered undo) was about to move.
        // So, the next player after undo should be the same as the current player.
        return context.currentPlayer // Keep the current player
      },
      switchCount: 0, // Reset switch count on undo
    }),
  },
  guards: {
    isEnded: ({ context }) => {
      return context.switchCount >= 2
    },
    isNoValidMoves: ({ context }) => {
      return countCandidate(context.board) === 0
    },
    isCurrentUserIsAI: ({ context }) => {
      return getUserType(context.users, context.currentPlayer) === UserType.AI
    },
  },
  actors: {
    aiPlaceChess: createAIActor(DEFAULT_AI_VERSION),
  },
}).createMachine({
  context: {
    board: Board.DEFAULT_BOARD,
    switchCount: 0,
    users: DEFAULT_USER,
    currentPlayer: Player.BLACK,
    // Initialize boardHistory in initial context
    boardHistory: [],
  },
  id: 'Reversi',
  initial: 'IDLE',
  states: {
    IDLE: {
      on: {
        start: {
          target: 'PLACE_CHESS',
          actions: {
            type: 'initialGame',
          },
        },
      },
    },
    GAME_LOOP: {
      always: {
        target: 'PLACE_CHESS',
      },
    },
    PLACE_CHESS: {
      entry: {
        type: 'placeCandidate',
      },
      on: {
        placed: {
          target: 'GAME_LOOP',
          actions: [
            emit(({ event, context }) => {
              assertEvent(event, 'placed')
              return {
                type: 'placed',
                point: event.point,
                player: context.currentPlayer,
              }
            }),
            {
              type: 'resetSwitch',
            },
            {
              type: 'switchPlayer',
            },
            {
              type: 'setBoard', // This action now also updates boardHistory
            },
          ],
        },
        // 5. Add undo transition
        undo: {
          actions: [
            { type: 'revertTurn' }, // Call the new action
            { type: 'placeCandidate' }, // Re-calculate candidates for the reverted board
            emit(() => ({ type: 'undoOccurred' })), // Emit undo event for log
          ],
          // Stay in PLACE_CHESS state
          target: 'PLACE_CHESS',
        },
      },
      always: [
        {
          guard: 'isEnded',
          target: 'ENDED',
        },
        {
          guard: 'isNoValidMoves',
          target: 'GAME_LOOP',
          actions: [
            {
              type: 'increaseSwitch',
            },
            emit(({ context }) => ({ type: 'noValidMove', player: context.currentPlayer })),
            {
              type: 'switchPlayer',
            },
          ],
        },
        {
          guard: 'isCurrentUserIsAI',
          target: 'AI_TURN',
        },
      ],
    },
    AI_TURN: {
      entry: [
        {
          type: 'increaseSwitch',
        },
        {
          type: 'placeCandidate',
        },
      ],
      invoke: {
        src: 'aiPlaceChess',
        input: ({ context }) => ({ board: context.board, player: context.currentPlayer }),
        onDone: {
          actions: [
            assign({
              board: ({ event }) => event.output.nextBoard,
              boardHistory: ({ context }) => [...context.boardHistory, context.board],
            }),
            emit(({ event, context }) => ({
              type: 'placed', // This emit is for logging/UI, not state transition
              point: event.output.point,
              player: context.currentPlayer,
            })),
            {
              type: 'resetSwitch',
            },
            {
              type: 'switchPlayer',
            },
          ],
          target: 'GAME_LOOP',
        },
      },
    },
    ENDED: {
      on: {
        restart: {
          target: 'IDLE',
          actions: 'resetGame',
        },
      },
    },
  },
})
