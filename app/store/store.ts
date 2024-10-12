import { configureStore as baseConfigureStore } from '@reduxjs/toolkit'

import { Record } from 'effect'
import createSagaMiddleware, { END } from 'redux-saga'
import { root } from './saga'

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = baseConfigureStore({
    reducer: Record.empty,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
      }).concat(sagaMiddleware),
  })

  return {
    store,
    runSaga: sagaMiddleware.run,
    close() {
      store.dispatch(END)
    },
  }
}

const { store, runSaga, close } = configureStore()

export { runSaga, store }

runSaga(root)

if (import.meta.hot) {
  import.meta.hot.accept('./saga', async () => {
    close()
    runSaga((await import('./saga')).root)
  })
}
