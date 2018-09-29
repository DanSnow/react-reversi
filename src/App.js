import React, { Component } from 'react'

import Game from './Game'
import { I18nextProvider } from 'react-i18next'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import configureStore from './store'
import { i18n } from './i18n'
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
        <I18nextProvider i18n={i18n}>
          <PersistGate persistor={persistor}>
            <Game />
          </PersistGate>
        </I18nextProvider>
      </Provider>
    )
  }
}
