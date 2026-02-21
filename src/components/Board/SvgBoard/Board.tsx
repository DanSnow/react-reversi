import type { ReactElement, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Board({ children }: Props): ReactElement {
  return (
    <svg height="640px" width="640px">
      {children}
    </svg>
  )
}
