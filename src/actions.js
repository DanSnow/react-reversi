import {
  ADD_SWITCH,
  CLEAR_LOG,
  PLACE_CHESS,
  PUSH_LOG,
  RESET,
  RESET_BOARD,
  RESET_SWITCH,
  RESTORE_STEP,
  SAVE_STEP,
  SET_AI,
  SET_CANDIDATE,
  SET_MESSAGE,
  SET_PLAYER,
  SET_RETRACT_STEP,
  SET_VERSION,
  SWITCH_PLAYER,
  USER_PLACE_CHESS
} from './consts'

import { createAction } from 'redux-actions'

export const pushLog = createAction(PUSH_LOG)
export const clearLog = createAction(CLEAR_LOG)
export const setMessage = createAction(SET_MESSAGE)
export const setCandidate = createAction(SET_CANDIDATE)
export const resetBoard = createAction(RESET_BOARD)
export const switchPlayer = createAction(SWITCH_PLAYER)
export const setPlayer = createAction(SET_PLAYER)
export const setAi = createAction(SET_AI)
export const setVersion = createAction(SET_VERSION)
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
