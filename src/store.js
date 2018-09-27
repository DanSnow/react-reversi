import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist'

import { createLogger } from 'redux-logger'
import { identity } from 'lodash-es'
import reducer from './reducer'
import storage from 'redux-persist/lib/storage'

const getDevtools = () => {
  if (__DEV__) {
    return window.devToolsExtension ? window.devToolsExtension() : identity
  }
  return identity
}

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const logger = createLogger()
  const store = createStore(
    persistReducer(
      { key: 'reversi', storage, whitelist: ['history'] },
      reducer
    ),
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

export default configureStore
