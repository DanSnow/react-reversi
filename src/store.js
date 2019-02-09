import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist'

import { createLogger } from 'redux-logger'
import { identity } from 'lodash-es'
import reducer from './reducer'
import root from './saga'
import storage from 'redux-persist/lib/storage'

const getDevtools = () => {
  if (__DEV__) {
    return window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : identity
  }
  return identity
}

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const logger = createLogger()
  const store = createStore(
    persistReducer({ key: 'reversi', storage, whitelist: ['history'] }, reducer),
    compose(
      applyMiddleware(sagaMiddleware, logger),
      getDevtools()
    )
  )
  const persistor = persistStore(store)

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default)
    })
  }

  return { store, persistor }
}

const { store, persistor } = configureStore()
export { persistor, store }

store.runSaga(root)

if (module.hot) {
  module.hot.accept('./saga', async () => {
    store.close()
    store.runSaga((await import('./saga')).default)
  })
}
