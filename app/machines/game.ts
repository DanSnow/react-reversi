import type { Users } from '~/store'
import invariant from 'tiny-invariant'
import { assign, setup } from 'xstate'
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
          const { board } = placeBoardCandidate({ board: context.board, player: context.currentPlayer })
          return board
        },
      }),
      clearCandidate: assign({
        board: ({ context }) => clearBoardCandidate(context.board),
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
      board: Board.DEFAULT_BOARD,
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
      GAME_LOOP: {
        always: {
          target: 'PLACE_CHESS',
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
          turn: {
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
