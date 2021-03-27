import { createReducer, PayloadAction } from '@reduxjs/toolkit'
import { constant, times } from 'lodash-es'

import {
  ADD_SWITCH,
  CLEAR_LOG,
  ENDED,
  IDLE,
  INCREMENT_HISTORY,
  PLACE_CHESS,
  PLAYING,
  PUSH_LOG,
  RESET_BOARD,
  RESET_SWITCH,
  RESTORE_STEP,
  SAVE_STEP,
  SET_AI,
  SET_CANDIDATE,
  SET_MESSAGE,
  SET_OVERLAY,
  SET_PLAYER,
  SET_RETRACT_STEP,
  SET_STATE,
  SET_VERSION,
} from './consts'

const initialBoard = times(8, () => times(8, constant(null)))

type GameState = typeof IDLE | typeof PLAYING | typeof ENDED

export interface Log {
  player: string
  pos: string
}

interface PastState {
  board: (string | null)[][]
  player: string | null
  log: Log[]
  candiate: number
  message: string
}

export interface State {
  state: GameState
  message: string
  overlay: string
  candiate: number
  switchCount: number
  version: 'v1' | 'v2'
  ai: string | null
  player: string | null
  log: Log[]
  board: (string | null)[][]
  pastStep: PastState[]
  allowRetractStep: number
  history: { win: number; lose: number; draw: number }
}

export const initialState: State = {
  state: IDLE,
  message: '',
  overlay: '',
  candiate: 0,
  switchCount: 0,
  version: 'v2',
  ai: null,
  player: null,
  log: [],
  board: initialBoard,
  pastStep: [],
  allowRetractStep: 0,
  history: { win: 0, lose: 0, draw: 0 },
}

export interface Coords {
  row: number
  col: number
}

export interface ChessInfo extends Coords {
  chess: string
}

export const reducer = createReducer(initialState, {
  [PLACE_CHESS]: (state, { payload: { row, col, chess } }: PayloadAction<ChessInfo>) => {
    state.board[row][col] = chess
  },
  [RESET_BOARD]: (state) => {
    Object.assign(state, { board: initialBoard, pastStep: [] })
  },
  [SAVE_STEP]: (state) => {
    state.pastStep.push({
      board: state.board,
      player: state.player,
      candiate: state.candiate,
      log: state.log,
      message: state.message,
    })

    if (state.pastStep.length > state.allowRetractStep) {
      state.pastStep.splice(1)
    }
  },
  [RESTORE_STEP]: (state) => {
    Object.assign(state, {
      ...state.pastStep[0],
      pastStep: state.pastStep.slice(1),
    })
  },
  [INCREMENT_HISTORY]: (state, { payload }: PayloadAction<'win' | 'lose' | 'draw'>) => {
    state.history[payload] += 1
  },
  [SET_PLAYER]: (state, { payload }: PayloadAction<string | null>) => {
    state.player = payload
  },
  [SET_AI]: (state, { payload }) => {
    state.ai = payload
  },
  [SET_CANDIDATE]: (state, { payload }: PayloadAction<number>) => {
    state.candiate = payload
  },
  [SET_MESSAGE]: (state, { payload }) => {
    state.message = payload
  },
  [SET_OVERLAY]: (state, { payload }) => {
    state.overlay = payload
  },
  [SET_STATE]: (state, { payload }) => {
    state.state = payload
  },
  [SET_RETRACT_STEP]: (state, { payload }) => {
    state.allowRetractStep = payload
  },
  [ADD_SWITCH]: (state) => {
    state.switchCount += 1
  },
  [RESET_SWITCH]: (state) => {
    state.switchCount = 0
  },
  [SET_VERSION]: (state, { payload }: PayloadAction<'v1' | 'v2'>) => {
    state.version = payload
  },
  [PUSH_LOG]: (state, { payload }: PayloadAction<Log>) => {
    state.log.push(payload)
  },
  [CLEAR_LOG]: (state) => {
    state.log = []
  },
})
