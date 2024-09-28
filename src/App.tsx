import type { ReactElement } from 'react'

import { Provider as AtomProvider } from 'jotai'
import { Provider } from 'react-redux'
import { store as atomStore } from './atoms/store'
import { Game } from './components/Game'

import { store } from './store'

export default function App(): ReactElement {
  return (
    <AtomProvider store={atomStore}>
      <Provider store={store}>
        <Game />
      </Provider>
    </AtomProvider>
  )
}
