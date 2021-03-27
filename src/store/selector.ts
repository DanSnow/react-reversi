import { createSelector, Selector } from '@reduxjs/toolkit'

import { BLACK, WHITE } from './consts'
import { State } from './reducer'

const selectBoard = (state: State) => state.board
const selectPlayer = (state: State) => state.player

export const createScoreSelector = (): Selector<State, { black: number; white: number }> =>
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
