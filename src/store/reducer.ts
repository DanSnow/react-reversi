import { combineReducers } from '@reduxjs/toolkit'

import { gameSlice } from './slices/game'
import { uiSlice } from './slices/ui'

export const reducer = combineReducers({
  game: gameSlice.reducer,
  ui: uiSlice.reducer,
})
