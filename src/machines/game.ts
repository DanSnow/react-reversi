import { createNextState as produce, freeze } from '@reduxjs/toolkit'
import { inspect } from '@xstate/inspect'
import { always, times } from 'rambda'
import invariant from 'tiny-invariant'
import { actions, ActorRef, interpret, sendParent, spawn } from 'xstate'
import { createModel } from 'xstate/lib/model'

import { BLACK, WHITE } from '../store/consts'
import { clearBoardCandidate, placeBoardCandidate } from '../store/lib/board'
import { UserType } from '../store/types'

const DEFAULT_BOARD: (string | null)[][] = freeze([
  times(always(null), 8),
  times(always(null), 8),
  times(always(null), 8),
  [null, null, null, BLACK, WHITE, null, null, null],
  [null, null, null, WHITE, BLACK, null, null, null],
  times(always(null), 8),
  times(always(null), 8),
  times(always(null), 8),
])

const DEFAULT_USER = { [BLACK]: UserType.Human, [WHITE]: UserType.Human }

const gameModel = createModel(
  {
    board: null as ActorRef<any> | null,
  },
  {
    events: {
      startGame: () => ({}),
      endGame: () => ({}),
    },
    actions: {
      clearBoard: () => [
        actions.stop((ctx: { board: ActorRef<any> }) => ctx.board),
        actions.assign({
          board: null,
        }),
      ],
    },
  }
)

export const gameMachine = gameModel.createMachine({
  initial: 'idle',
  context: gameModel.initialContext,
  states: {
    idle: {
      entry: actions.choose([
        {
          cond: (ctx) => !!ctx.board,
          actions: [gameModel.actions.clearBoard()],
        },
      ]),
      on: {
        startGame: { target: 'playing', actions: gameModel.assign({ board: () => spawn(boardMachine) }) },
      },
    },
    playing: {
      on: {
        endGame: 'idle',
      },
    },
  },
})

const boardModel = createModel(
  {
    board: DEFAULT_BOARD,
    switchCount: 0,
    users: DEFAULT_USER,
    candidateCount: 0,
  },
  {
    events: {
      switchPlayer: () => ({}),
    },
  }
)

export const boardMachine = boardModel.createMachine(
  {
    initial: 'black',
    context: boardModel.initialContext,
    states: {
      black: {
        always: [
          {
            cond: (ctx) => ctx.candidateCount === 0 && ctx.switchCount >= 3,
            target: 'ending',
          },
        ],
        entry: 'placeCandidates',
        on: {
          switchPlayer: 'white',
        },
      },
      white: {
        always: [
          {
            cond: (ctx) => ctx.candidateCount === 0 && ctx.switchCount >= 3,
            target: 'ending',
          },
        ],
        entry: 'placeCandidates',
        on: {
          switchPlayer: 'black',
        },
      },
      ending: {
        type: 'final',
        entry: sendParent(gameModel.events.endGame()),
        on: {
          switchPlayer: 'ending',
        },
      },
    },
  },
  {
    actions: {
      placeCandidates: (context, event, { state }) => {
        invariant(state.value === 'black' || state.value === 'white', 'placeCandidates: state is not black or white')

        context.board = produce(context.board, (draft) => {
          const { board, count } = placeBoardCandidate({
            board: clearBoardCandidate(draft),
            player: state.value === 'black' ? BLACK : WHITE,
          })
          context.candidateCount = count
          return board
        })

        if (context.candidateCount === 0) {
          context.switchCount++
        }
      },
    },
  }
)

inspect({ iframe: false })

// @ts-expect-error aaa
window.machine = interpret(gameMachine, { devTools: true }).start()
