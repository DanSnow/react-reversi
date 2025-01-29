import type { Point, Users } from '~/types'
import type { GameEmittedEvents } from '~/types/events'
import { pipe } from 'effect'
import invariant from 'tiny-invariant'
import { assertEvent, assign, emit, setup } from 'xstate'
import { createAIActor } from '~/actor/ai'
import { DEFAULT_AI_VERSION } from '~/store/lib/ai'
import { clearBoardCandidate, countCandidate, placeBoardCandidate } from '~/store/lib/board'
import { getOpposite } from '~/store/lib/chess-utils'
import { Board, DEFAULT_USER, getUserType, Player, UserType } from '~/types'

export type GameEvents =
  | { type: 'start'; users: Users }
  | { type: 'placed'; point: Point; nextBoard: Board.Board }
  | { type: 'restart' }

export const gameMachine = setup({
  types: {
    context: {} as {
      board: Board.Board
      users: Users
      switchCount: number
      currentPlayer: Player.Player
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
    }),
    resetGame: assign({
      board: Board.DEFAULT_BOARD,
      users: DEFAULT_USER,
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
    setBoard: assign({
      board: ({ event }) => {
        invariant(event.type === 'placed')

        return event.nextBoard
      },
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
              type: 'setBoard',
            },
          ],
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
            }),
            emit(({ event, context }) => ({
              type: 'placed',
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
