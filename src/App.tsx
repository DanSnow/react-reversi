import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Game from './Game'
import { persistor, store } from './store'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Game />
      </PersistGate>
    </Provider>
  )
}
