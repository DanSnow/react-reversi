import type { ReactElement } from 'react'
import { Rect } from 'react-konva'

export function Base(): ReactElement {
  return <Rect fill="green" width={640} height={640} />
}
