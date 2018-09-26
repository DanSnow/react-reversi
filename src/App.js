import React, { Component } from 'react'

import Game from './Game'
import { Provider } from 'react-redux'
import configureStore from './store'
import root from './saga'

const store = configureStore()
store.runSaga(root)
if (module.hot) {
  module.hot.accept('./saga', () => {
    store.close()
    store.runSaga(require('./saga').default)
  })
}

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    )
  }
}
