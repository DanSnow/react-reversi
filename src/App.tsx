import type { ReactElement } from 'react'

import { Provider as AtomProvider } from 'jotai'
import { Provider } from 'react-redux'
import { store as atomStore } from './atoms/store'
import { Game } from './components/Game'

import { PersistGate } from './PersistGate'
import { persistor, store } from './store'

export default function App(): ReactElement {
  return (
    <AtomProvider store={atomStore}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Game />
        </PersistGate>
      </Provider>
    </AtomProvider>
  )
}
