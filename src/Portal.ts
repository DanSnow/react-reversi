import { ReactChild, ReactElement, useRef } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  target: string
  children?: ReactChild
}
function Portal({ target, children }: Props): ReactElement {
  const domStore = useRef<Element>(null)
  if (!domStore.current) {
    domStore.current = document.getElementById(target)
  }
  return createPortal(children, domStore.current)
}

export default Portal
