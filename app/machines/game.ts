import invariant from 'tiny-invariant'
import { assign, setup } from 'xstate'
import type { Users } from '~/store'
import { Board, Player } from '~/store'
import { clearBoardCandidate, placeBoardCandidate } from '~/store/lib/board'
import { getOpposite } from '~/store/lib/chess-utils'

export const createGameMachine = (users: Users) =>
  setup({
    types: {
      context: {} as {
        board: Board.Board
        users: Users
        switchCount: number
        currentPlayer: Player.Player
      },
      events: {} as { type: 'turn' } | { type: 'start' } | { type: 'placed'; nextBoard: Board.Board },
    },
    actions: {
      initialGame: assign({
        board: () => Board.DEFAULT_BOARD,
      }),
      placeCandidate: assign({
        board: ({ context }) => {
          const { board } = placeBoardCandidate({ board: context.board, player: context.currentPlayer })
          return board
        },
      }),
      clearCandidate: assign({
        board: ({ context }) => {
          const board = clearBoardCandidate(context.board)
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
    },
  }).createMachine({
    context: {
      board: Board.EMPTY_BOARD,
      switchCount: 0,
      users,
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
