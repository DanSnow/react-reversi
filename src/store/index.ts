import { store } from './store'

export * from './actions'
export * from './consts'
export * from './selector'
export { gameActions } from './slices/game'
export { uiActions } from './slices/ui'
export type { RootState } from './store'
export { configureStore, persistor, store } from './store'
export * from './types'

export type AppDispatch = typeof store.dispatch
