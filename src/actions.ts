import {
  ADD_SWITCH,
  CLEAR_LOG,
  INCREMENT_HISTORY,
  PLACE_CHESS,
  PUSH_LOG,
  REBOOT,
  RESET,
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
  SWITCH_PLAYER,
  USER_PLACE_CHESS,
  PLAYING,
  IDLE,
  ENDED,
} from './consts'

import { createAction } from '@reduxjs/toolkit'
import { Log } from './reducer'

export const addSwitch = createAction(ADD_SWITCH)
export const clearLog = createAction(CLEAR_LOG)
export const incrementHistory = createAction<'win' | 'lose' | 'draw'>(INCREMENT_HISTORY)
export const pushLog = createAction<Log>(PUSH_LOG)
export const reboot = createAction(REBOOT)
export const reset = createAction<string | null>(RESET)
export const resetBoard = createAction(RESET_BOARD)
export const resetSwitch = createAction(RESET_SWITCH)
export const restoreStep = createAction(RESTORE_STEP)
export const saveStep = createAction(SAVE_STEP)
export const setAi = createAction<string | null>(SET_AI)
export const setCandidate = createAction<number>(SET_CANDIDATE)
export const setMessage = createAction<string>(SET_MESSAGE)
export const setOverlay = createAction<string>(SET_OVERLAY)
export const setPlayer = createAction<string>(SET_PLAYER)
export const setRetractStep = createAction<number>(SET_RETRACT_STEP)
export const setState = createAction<typeof IDLE | typeof PLAYING | typeof ENDED>(SET_STATE)
export const setVersion = createAction(SET_VERSION)
export const switchPlayer = createAction(SWITCH_PLAYER)

export const placeChess = createAction(PLACE_CHESS, (row, col, chess) => ({
  payload: {
    row,
    col,
    chess,
  },
}))
export const userPlaceChess = createAction(USER_PLACE_CHESS, (row, col) => ({
  payload: {
    row,
    col,
  },
}))
