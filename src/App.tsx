import { persistor, store } from './store'

import Game from './Game'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import React from 'react'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Game />
      </PersistGate>
    </Provider>
  )
}
