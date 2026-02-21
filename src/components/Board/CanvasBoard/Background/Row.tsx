import type { ReactElement } from 'react'
import { Line } from 'react-konva'

interface Props {
  row: number
}

export function Row({ row }: Props): ReactElement {
  return <Line stroke="black" strokeWidth={1} points={[0, row * 80, 640, row * 80]} />
}
