import {handleActions} from 'redux-actions'
import times from 'lodash/times'
import constant from 'lodash/constant'
import Immutable from 'seamless-immutable'
import {
  PUSH_LOG,
  CLEAR_LOG,
  RESET_BOARD,
  SAVE_STEP,
  RESTORE_STEP,
  SET_CANDIDATE,
  SET_MESSAGE,
  SET_RETRACT_STEP,
  SET_AI,
  ADD_SWITCH,
  RESET_SWITCH,
  SET_PLAYER,
  PLACE_CHESS
} from './consts'

const initialBoard = times(8, () => times(8, constant(null)))
export const initialState = Immutable.from({
  message: '',
  candiate: 0,
  switchCount: 0,
  ai: null,
  player: null,
  log: [],
  board: initialBoard,
  pastStep: [],
  allowRetractStep: 0
})

export default handleActions(
  {
    [PLACE_CHESS]: (state, {payload: {row, col, chess}}) =>
      Immutable.setIn(state, ['board', row, col], chess),
    [RESET_BOARD]: state =>
      Immutable.merge(state, {board: initialBoard, pastStep: []}),
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
    [SET_PLAYER]: (state, {payload}) => Immutable.set(state, 'player', payload),
    [SET_AI]: (state, {payload}) => Immutable.set(state, 'ai', payload),
    [SET_CANDIDATE]: (state, {payload}) =>
      Immutable.set(state, 'candiate', payload),
    [SET_MESSAGE]: (state, {payload}) =>
      Immutable.set(state, 'message', payload),
    [SET_RETRACT_STEP]: (state, {payload}) =>
      Immutable.set(state, 'allowRetractStep', payload),
    [ADD_SWITCH]: state =>
      Immutable.set(state, 'switchCount', state.switchCount + 1),
    [RESET_SWITCH]: state => Immutable.set(state, 'switchCount', 0),
    [PUSH_LOG]: (state, {payload}) =>
      Immutable.set(state, 'log', [...state.log, payload]),
    [CLEAR_LOG]: state => Immutable.set(state, 'log', [])
  },
  initialState
)
