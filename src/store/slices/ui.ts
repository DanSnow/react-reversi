import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { History } from '../types'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    overlay: '',
    history: { win: 0, lose: 0, draw: 0 } as History,
  },
  reducers: {
    incrementHistory: (state, { payload }: PayloadAction<keyof History>) => {
      state.history[payload] += 1
    },
    setOverlay(state, { payload }: PayloadAction<string>) {
      state.overlay = payload
    },
  },
})

export const uiActions = uiSlice.actions
