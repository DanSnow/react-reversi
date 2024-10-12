import invariant from 'tiny-invariant'
import { assign, setup } from 'xstate'
import { initialBoard } from '~/lib/consts'
import type { Board, UserType, WHITE } from '~/store'
import { BLACK, DEFAULT_BOARD } from '~/store'
import { clearBoardCandidate, placeBoardCandidate } from '~/store/lib/board'
import { getOpposite } from '~/store/lib/chess-utils'

interface Users {
  [BLACK]: UserType
  [WHITE]: UserType
}

export const createGameMachine = (users: Users) =>
  setup({
    types: {
      context: {} as {
        board: Board
        users: Users
        switchCount: number
        currentPlayer: string
      },
      events: {} as { type: 'turn' } | { type: 'start' } | { type: 'placed'; nextBoard: Board },
    },
    actions: {
      initialGame: assign({
        board: () => DEFAULT_BOARD,
      }),
      placeCandidate: assign({
        board: ({ context }) => {
          const { board } = placeBoardCandidate({ board: context.board, player: context.currentPlayer })
          return board as Board
        },
      }),
      clearCandidate: assign({
        board: ({ context }) => {
          const board = clearBoardCandidate(context.board)
          return board as Board
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
    },
  }).createMachine({
    context: {
      board: initialBoard,
      switchCount: 0,
      users,
      currentPlayer: BLACK,
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
      PLACE_CHESS: {
        entry: {
          type: 'placeCandidate',
        },
        exit: {
          type: 'clearCandidate',
        },
        on: {
          placed: {
            target: 'PLACE_CHESS',
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
          turn: {
            target: 'PLACE_CHESS',
            actions: [
              {
                type: 'increaseSwitch',
              },
              {
                type: 'switchPlayer',
              },
            ],
          },
        },
        always: {
          target: 'ENDED',
          guard: {
            type: 'isEnded',
          },
        },
      },
      ENDED: {},
    },
  })
