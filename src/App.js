import React, { Component } from 'react'

import Game from './Game'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import configureStore from './store'
import root from './saga'

const { store, persistor } = configureStore()
store.runSaga(root)
if (module.hot) {
  module.hot.accept('./saga', async () => {
    store.close()
    store.runSaga((await import('./saga')).default)
  })
}

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Game />
        </PersistGate>
      </Provider>
    )
  }
}
