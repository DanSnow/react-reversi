import process from 'node:process'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import type { Persistor } from 'redux-persist'

interface Props {
  children: ReactElement | ((bootstrapped: boolean) => ReactElement)
  loading?: ReactElement
  persistor: Persistor
}

export function PersistGate(props: Props): ReactElement {
  const [bootstrapped, setBootstrapped] = useState(false)
  const { persistor } = props

  useEffect(() => {
    const handlePersistor = () => {
      const { bootstrapped } = persistor.getState()
      if (bootstrapped) {
        setBootstrapped(true)
      }
    }
    const unsubscribe = persistor.subscribe(() => {
      handlePersistor()
      unsubscribe()
    })
    handlePersistor()
    return unsubscribe
  }, [persistor])

  if (process.env.NODE_ENV !== 'production') {
    if (typeof props.children === 'function' && props.loading)
      console.error(
        'redux-persist: PersistGate expects either a function child or loading prop, but not both. The loading prop will be ignored.',
      )
  }

  if (typeof props.children === 'function') {
    return props.children(bootstrapped)
  }

  return bootstrapped ? props.children : props.loading ?? null
}
