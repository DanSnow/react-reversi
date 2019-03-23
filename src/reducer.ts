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
  SET_VERSION
} from './consts'
import { Action, handleActions } from 'redux-actions'
import { constant, times } from 'lodash-es'
import { produce, setAutoFreeze } from 'immer'

setAutoFreeze(false)

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
  history: { win: 0, lose: 0, draw: 0 }
}

export interface Coords {
  row: number
  col: number
}

export interface ChessInfo extends Coords {
  chess: string
}

export default handleActions<State, any>(
  {
    [PLACE_CHESS]: (state, { payload: { row, col, chess } }: Action<ChessInfo>) =>
      produce(state, draft => {
        draft.board[row][col] = chess
      }),
    [RESET_BOARD]: state =>
      produce(state, draft => {
        Object.assign(draft, { board: initialBoard, pastStep: [] })
      }),
    [SAVE_STEP]: state =>
      produce(state, draft => {
        draft.pastStep.push({
          board: state.board,
          player: state.player,
          candiate: state.candiate,
          log: state.log,
          message: state.message
        })
        if (draft.pastStep.length > draft.allowRetractStep) {
          draft.pastStep.splice(1)
        }
      }),
    [RESTORE_STEP]: state =>
      produce(state, draft => {
        Object.assign(draft, {
          ...state.pastStep[0],
          pastStep: state.pastStep.slice(1)
        })
      }),
    [INCREMENT_HISTORY]: (state, { payload }: Action<'win' | 'lose' | 'draw'>) =>
      produce(state, draft => {
        draft.history[payload] += 1
      }),
    [SET_PLAYER]: (state, { payload }: Action<string | null>) =>
      produce(state, draft => {
        draft.player = payload
      }),
    [SET_AI]: (state, { payload }) =>
      produce(state, draft => {
        draft.ai = payload
      }),
    [SET_CANDIDATE]: (state, { payload }: Action<number>) =>
      produce(state, draft => {
        draft.candiate = payload
      }),
    [SET_MESSAGE]: (state, { payload }) =>
      produce(state, draft => {
        draft.message = payload
      }),
    [SET_OVERLAY]: (state, { payload }) =>
      produce(state, draft => {
        draft.overlay = payload
      }),
    [SET_STATE]: (state, { payload }) =>
      produce(state, draft => {
        draft.state = payload
      }),
    [SET_RETRACT_STEP]: (state, { payload }) =>
      produce(state, draft => {
        draft.allowRetractStep = payload
      }),
    [ADD_SWITCH]: state =>
      produce(state, draft => {
        draft.switchCount += 1
      }),
    [RESET_SWITCH]: state =>
      produce(state, draft => {
        draft.switchCount = 0
      }),
    [SET_VERSION]: (state, { payload }: Action<'v1' | 'v2'>) =>
      produce(state, draft => {
        draft.version = payload
      }),
    [PUSH_LOG]: (state, { payload }: Action<Log>) =>
      produce(state, draft => {
        draft.log.push(payload)
      }),
    [CLEAR_LOG]: state =>
      produce(state, draft => {
        draft.log = []
      })
  },
  initialState
)
