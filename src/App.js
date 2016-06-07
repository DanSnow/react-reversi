import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Game from './Game'
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
  render() {
    return (
      <Provider store={ store }>
        <Game />
      </Provider>
    )
  }
}
