import type { ReactElement } from 'react'
import { Circle, Text } from 'react-konva'

interface Props<T> {
  x: number
  y: number
  color: string
  children: string
  background: string
  value: T
  onClick: (val: T) => void
}

export function ColorButton<T>({ x, y, color, children, background, onClick, value }: Props<T>): ReactElement {
  return (
    <>
      <Circle name={`${color} button`} x={x} y={y} radius={80} fill={background} onClick={() => onClick(value)} />
      <Text fill={color} fontSize={36} x={x - 36} y={y - 18} text={children} />
    </>
  )
}
