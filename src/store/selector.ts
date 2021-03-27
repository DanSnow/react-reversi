import { createSelector, Selector } from '@reduxjs/toolkit'

import { BLACK, WHITE } from './consts'
import { RootState } from './store'

const selectBoard = (state: RootState) => state.game.board
const selectPlayer = (state: RootState) => state.game.player

export const createScoreSelector = (): Selector<RootState, { black: number; white: number }> =>
  createSelector([selectBoard], (board) => {
    let black = 0
    let white = 0
    board.forEach((row) => {
      row.forEach((col) => {
        if (col === BLACK) {
          black += 1
        } else if (col === WHITE) {
          white += 1
        }
      })
    })
    return { black, white }
  })

export const startedSelector = createSelector([selectPlayer], (player) => !!player)
