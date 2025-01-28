import type { Users } from '~/store'
import { Effect, pipe } from 'effect'
import invariant from 'tiny-invariant'
import { assign, fromPromise, setup } from 'xstate'
import { createAIActor } from '~/actor/ai'
import { aiVersionAtom } from '~/atoms/game'
import { store } from '~/atoms/store'
import { Board, DEFAULT_USER, getUserType, Player, UserType } from '~/store'
import { computeScores } from '~/store/ai'
import { DEFAULT_AI_VERSION } from '~/store/lib/ai'
import { clearBoardCandidate, countCandidate, placeAndFlip, placeBoardCandidate } from '~/store/lib/board'
import { getBestPoint, getOpposite } from '~/store/lib/chess-utils'

export const createGameMachine = () =>
  setup({
    types: {
      context: {} as {
        board: Board.Board
        users: Users
        switchCount: number
        currentPlayer: Player.Player
      },
      events: {} as { type: 'turn' } | { type: 'start'; users: Users } | { type: 'placed'; nextBoard: Board.Board },
    },
    actions: {
      initialGame: assign({
        board: () => Board.DEFAULT_BOARD,
        users: ({ event }) => {
          invariant(event.type === 'start')
          return event.users
        },
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
                board: ({ event }) => event.output,
              }),
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
      ENDED: {},
    },
  })
