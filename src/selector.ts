import { BLACK, WHITE } from './consts'

import { State } from './reducer'
import { createSelector } from '@reduxjs/toolkit'

const selectBoard = (state: State) => state.board
const selectPlayer = (state: State) => state.player

export const createScoreSelector = () =>
  createSelector([selectBoard], (board) => {
    var black = 0
    var white = 0
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
