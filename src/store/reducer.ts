import { combineReducers } from '@reduxjs/toolkit'

import { gameSlice } from './slices/game'

export const reducer = combineReducers({
  game: gameSlice.reducer,
})
