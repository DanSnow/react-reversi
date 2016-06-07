import { createAction } from 'redux-actions'
import {
  FLIP_ALL_CHESS,
  SET_MESSAGE,
  SWITCH_PLAYER,
  PLACE_CANDIDATE,
  SET_CANDIDATE,
  CLEAR_CANDIDATE,
  SET_PLAYER,
  SET_AI,
  ADD_SWITCH,
  RESET_SWITCH,
  RESET_BOARD,
  PLACE_CHESS,
  USER_PLACE_CHESS,
  RESET
} from './consts'

export const flipAllChess = createAction(FLIP_ALL_CHESS)
export const setMessage = createAction(SET_MESSAGE)
export const setCandidate = createAction(SET_CANDIDATE)
export const resetBoard = createAction(RESET_BOARD)
export const switchPlayer = createAction(SWITCH_PLAYER)
export const setPlayer = createAction(SET_PLAYER)
export const setAi = createAction(SET_AI)
export const addSwitch = createAction(ADD_SWITCH)
export const resetSwitch = createAction(RESET_SWITCH)
export const placeChess = createAction(PLACE_CHESS, (row, col, chess) => ({ row, col, chess }))
export const placeCandidate = createAction(PLACE_CANDIDATE)
export const clearCandidate = createAction(CLEAR_CANDIDATE)
export const userPlaceChess = createAction(USER_PLACE_CHESS, (row, col) => ({ row, col }))
export const reset = createAction(RESET)
