import { Store, StoreCreator, StoreEnhancer, applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist'

import { createLogger } from 'redux-logger'
import { identity } from 'lodash-es'
import reducer from './reducer'
import root from './saga'
import storage from 'redux-persist/lib/storage'

const getDevtools = (): StoreEnhancer<{}> => {
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

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default)
    })
  }

  return {
    store,
    persistor,
    runSaga: sagaMiddleware.run,
    close () {
      store.dispatch(END as any)
    }
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
