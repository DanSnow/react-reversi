import { Provider } from 'react-redux'

import Game from './Game'
import { PersistGate } from './PersistGate'
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
