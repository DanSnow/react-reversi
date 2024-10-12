import type { store } from './store'

export * from './actions'
export * from './compute-score'
export * from './consts'
export { gameActions } from './slices/game'
export { configureStore, store } from './store'
export * from './types'

export type AppDispatch = typeof store.dispatch
