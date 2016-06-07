import { handleActions } from 'redux-actions'
import times from 'lodash/times'
import constant from 'lodash/constant'
import update from 'react-addons-update'
import {
  PUSH_LOG,
  CLEAR_LOG,
  RESET_BOARD,
  SET_CANDIDATE,
  SET_MESSAGE,
  SET_AI,
  ADD_SWITCH,
  RESET_SWITCH,
  SET_PLAYER,
  PLACE_CHESS
} from './consts'

const initialBoard = times(8, () => times(8, constant(null)))
export const initialState = {
  message: '',
  candiate: 0,
  switchCount: 0,
  ai: null,
  player: null,
  log: [],
  board: initialBoard
}

export default handleActions({
  [PLACE_CHESS]: (state, { payload }) => update(state, {
    board: {
      [payload.row]: {
        [payload.col]: { $set: payload.chess }
      }
    }
  }),
  [RESET_BOARD]: (state) => update(state, { board: { $set: initialBoard } }),
  [SET_PLAYER]: (state, { payload }) => update(state, { player: { $set: payload } }),
  [SET_AI]: (state, { payload }) => update(state, { ai: { $set: payload } }),
  [SET_CANDIDATE]: (state, { payload }) => update(state, { candiate: { $set: payload } }),
  [SET_MESSAGE]: (state, { payload }) => update(state, { message: { $set: payload } }),
  [ADD_SWITCH]: (state) => update(state, { switchCount: { $set: state.switchCount + 1 } }),
  [RESET_SWITCH]: (state) => update(state, { switchCount: { $set: 0 } }),
  [PUSH_LOG]: (state, { payload }) => update(state, { log: { $push: [payload] } }),
  [CLEAR_LOG]: (state) => update(state, { log: { $set: [] } })
}, initialState)
