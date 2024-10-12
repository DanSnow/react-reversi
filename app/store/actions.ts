import { createAction } from '@reduxjs/toolkit'

import { REBOOT, RESET, SWITCH_PLAYER, USER_PLACE_CHESS } from './consts'

export const reboot = createAction(REBOOT)
export const reset = createAction<string | null>(RESET)
export const switchPlayer = createAction(SWITCH_PLAYER)

export const userPlaceChess = createAction(USER_PLACE_CHESS, (row, col) => ({
  payload: {
    row,
    col,
  },
}))
