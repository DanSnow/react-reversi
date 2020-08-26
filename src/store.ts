import { configureStore as baseConfigureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware, { END } from 'redux-saga'

import reducer from './reducer'
import root from './saga'

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const logger = createLogger()
  const store = baseConfigureStore({
    reducer: persistReducer({ key: 'reversi', storage, whitelist: ['history'] }, reducer),
    middleware: getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware, logger),
  })
  const persistor = persistStore(store)

  if (module.hot) {
    module.hot.accept('./reducer', async () => {
      store.replaceReducer(require('./reducer').default)
    })
  }

  return {
    store,
    persistor,
    runSaga: sagaMiddleware.run,
    close() {
      store.dispatch(END as any)
    },
  }
}

const { store, persistor, runSaga, close } = configureStore()
export { persistor, store, runSaga }

runSaga(root)

if (module.hot) {
  module.hot.accept('./saga', async () => {
    close()
    runSaga((await import('./saga')).default)
  })
}
