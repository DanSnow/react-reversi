import { handleActions } from 'redux-actions'
import times from 'lodash/times'
import constant from 'lodash/constant'
import update from 'react-addons-update'
import {
  RESET_BOARD,
  SET_CANDIDATE,
  SET_MESSAGE,
  SET_HINT,
  SET_PLAYER,
  SET_SCORE,
  PLACE_CHESS,
} from './consts'

const initialBoard = times(8, () => times(8, constant(null)))
export const initialState = {
  message: '',
  candiate: 0,
  player: null,
  board: initialBoard
};

export default handleActions({
  [PLACE_CHESS]: (state, { payload }) => update(state, {
    board: {
      [payload.row]: {
        [payload.col]: { $set: payload.chess }
      }
    }
  }),
  [RESET_BOARD]: (state, { payload }) => update(state, { board: { $set: initialBoard } }),
  [SET_PLAYER]: (state, { payload }) => update(state, { player: { $set: payload } }),
  [SET_CANDIDATE]: (state, { payload }) => update(state, { candiate: { $set: payload } }),
  [SET_MESSAGE]: (state, { payload }) => update(state, { message: { $set: payload } })
}, initialState)
