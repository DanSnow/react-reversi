import type { ReactElement } from 'react'
import type { Point } from '~/types'
import { useCallback } from 'react'
import { Circle, Rect } from 'react-konva'

interface Props {
  color: string
  showHint: boolean
  row: number
  col: number
  isCandidate: boolean
  onClick: (point: Point) => void
}

export function Chess({ color, row, col, isCandidate, showHint, onClick }: Props): ReactElement {
  const handleClick = useCallback(() => {
    onClick({ row, col })
  }, [row, col, onClick])

  return (
    <>
      <Rect onClick={handleClick} width={80} height={80} x={col * 80} y={row * 80} />
      <Circle
        fill={color}
        opacity={isCandidate ? (showHint ? 0.3 : 0) : 1}
        x={col * 80 + 40}
        y={row * 80 + 40}
        radius={30}
        onClick={handleClick}
      />
    </>
  )
}
