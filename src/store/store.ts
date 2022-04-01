import { configureStore as baseConfigureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware, { END } from 'redux-saga'

import { reducer } from './reducer'
import { root } from './saga'

export type RootState = ReturnType<typeof reducer>

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = baseConfigureStore({
    reducer: persistReducer({ key: 'reversi', storage, whitelist: ['history'] }, reducer),
    middleware: getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
  })
  const persistor = persistStore(store)

  if (import.meta.hot) {
    import.meta.hot.accept('./reducer', async () => {
      store.replaceReducer((await import('./reducer')).reducer as any)
    })
  }

  return {
    store,
    persistor,
    runSaga: sagaMiddleware.run,
    close() {
      store.dispatch(END)
    },
  }
}

const { store, persistor, runSaga, close } = configureStore()

export { persistor, runSaga, store }

runSaga(root)

if (import.meta.hot) {
  import.meta.hot.accept('./saga', async () => {
    close()
    runSaga((await import('./saga')).root)
  })
}
