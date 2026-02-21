import type { ReactElement, ReactNode } from 'react'
import { Layer, Stage } from 'react-konva'

interface Props {
  children: ReactNode
}

export function Board({ children }: Props): ReactElement {
  return (
    <Stage width={640} height={640}>
      <Layer>{children}</Layer>
    </Stage>
  )
}
