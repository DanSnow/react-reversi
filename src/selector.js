import { BLACK, WHITE } from './consts'

import { createSelector } from 'reselect'

const selectBoard = state => state.board

export const scoreSelector = createSelector([selectBoard], board => {
  var black = 0
  var white = 0
  board.forEach(row => {
    row.forEach(col => {
      if (col === BLACK) {
        black += 1
      } else if (col === WHITE) {
        white += 1
      }
    })
  })
  return { black, white }
})
