import type { ReactElement } from 'react'

export function Base(): ReactElement {
  return <rect fill="green" width="640" height="640" data-testid="background" />
}
