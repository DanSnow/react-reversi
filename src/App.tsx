import { ReactElement } from 'react'
import { Provider } from 'react-redux'

import { Game } from './components/Game'
import { PersistGate } from './PersistGate'
import { persistor, store } from './store'

export default function App(): ReactElement {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Game />
      </PersistGate>
    </Provider>
  )
}
