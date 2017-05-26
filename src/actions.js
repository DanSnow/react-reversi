import {createAction} from 'redux-actions'
import {
  PUSH_LOG,
  CLEAR_LOG,
  SET_MESSAGE,
  SWITCH_PLAYER,
  SET_CANDIDATE,
  SET_RETRACT_STEP,
  SAVE_STEP,
  RESTORE_STEP,
  SET_PLAYER,
  SET_AI,
  ADD_SWITCH,
  RESET_SWITCH,
  RESET_BOARD,
  PLACE_CHESS,
  USER_PLACE_CHESS,
  RESET
} from './consts'

export const pushLog = createAction(PUSH_LOG)
export const clearLog = createAction(CLEAR_LOG)
export const setMessage = createAction(SET_MESSAGE)
export const setCandidate = createAction(SET_CANDIDATE)
export const resetBoard = createAction(RESET_BOARD)
export const switchPlayer = createAction(SWITCH_PLAYER)
export const setPlayer = createAction(SET_PLAYER)
export const setAi = createAction(SET_AI)
export const addSwitch = createAction(ADD_SWITCH)
export const resetSwitch = createAction(RESET_SWITCH)
export const setRetractStep = createAction(SET_RETRACT_STEP)
export const saveStep = createAction(SAVE_STEP)
export const restoreStep = createAction(RESTORE_STEP)
export const placeChess = createAction(PLACE_CHESS, (row, col, chess) => ({
  row,
  col,
  chess
}))
export const userPlaceChess = createAction(USER_PLACE_CHESS, (row, col) => ({
  row,
  col
}))
export const reset = createAction(RESET)
