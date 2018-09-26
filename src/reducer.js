import {
  ADD_SWITCH,
  CLEAR_LOG,
  PLACE_CHESS,
  PUSH_LOG,
  RESET_BOARD,
  RESET_SWITCH,
  RESTORE_STEP,
  SAVE_STEP,
  SET_AI,
  SET_CANDIDATE,
  SET_MESSAGE,
  SET_PLAYER,
  SET_RETRACT_STEP,
  SET_VERSION
} from './consts'
import { constant, times } from 'lodash-es'

import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'

const initialBoard = times(8, () => times(8, constant(null)))
export const initialState = Immutable.from({
  message: '',
  candiate: 0,
  switchCount: 0,
  version: 'v2',
  ai: null,
  player: null,
  log: [],
  board: initialBoard,
  pastStep: [],
  allowRetractStep: 0
})

export default handleActions(
  {
    [PLACE_CHESS]: (state, { payload: { row, col, chess } }) =>
      Immutable.setIn(state, ['board', row, col], chess),
    [RESET_BOARD]: state =>
      Immutable.merge(state, { board: initialBoard, pastStep: [] }),
    [SAVE_STEP]: state => {
      const nextState = Immutable.set(state, 'pastStep', [
        ...state.pastStep,
        {
          board: state.board,
          player: state.player,
          candiate: state.candiate,
          log: state.log,
          message: state.message
        }
      ])
      if (nextState.pastStep.length > state.allowRetractStep) {
        return Immutable.set(nextState, 'pastStep', state.pastStep.slice(1))
      }
      return nextState
    },
    [RESTORE_STEP]: state =>
      Immutable.merge(state, {
        ...state.pastStep[0],
        pastStep: state.pastStep.slice(1)
      }),
    [SET_PLAYER]: (state, { payload }) =>
      Immutable.set(state, 'player', payload),
    [SET_AI]: (state, { payload }) => Immutable.set(state, 'ai', payload),
    [SET_CANDIDATE]: (state, { payload }) =>
      Immutable.set(state, 'candiate', payload),
    [SET_MESSAGE]: (state, { payload }) =>
      Immutable.set(state, 'message', payload),
    [SET_RETRACT_STEP]: (state, { payload }) =>
      Immutable.set(state, 'allowRetractStep', payload),
    [ADD_SWITCH]: state =>
      Immutable.set(state, 'switchCount', state.switchCount + 1),
    [RESET_SWITCH]: state => Immutable.set(state, 'switchCount', 0),
    [SET_VERSION]: (state, { payload }) =>
      Immutable.set(state, 'version', payload),
    [PUSH_LOG]: (state, { payload }) =>
      Immutable.set(state, 'log', [...state.log, payload]),
    [CLEAR_LOG]: state => Immutable.set(state, 'log', [])
  },
  initialState
)
