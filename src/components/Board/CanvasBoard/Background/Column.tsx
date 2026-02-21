import type { ReactElement } from 'react'
import { Line } from 'react-konva'

interface Props {
  col: number
}

export function Column({ col }: Props): ReactElement {
  return <Line stroke="black" strokeWidth={1} points={[col * 80, 0, col * 80, 640]} />
}
