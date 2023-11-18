import styled from '@emotion/styled'
import type { ReactElement } from 'react'
import { useCallback } from 'react'

const Circle = styled.circle({
  pointerEvents: 'none',
})

interface Props {
  color: string
  showHint: boolean
  row: number
  col: number
  isCandidate: boolean
  onClick: (row: number, col: number) => void
}

function Chess({ color, row, col, isCandidate, showHint, onClick }: Props): ReactElement {
  const handleClick = useCallback(() => {
    onClick(row, col)
  }, [row, col, onClick])

  return (
    <>
      <rect onClick={handleClick} width="80" height="80" fillOpacity="0" x={col * 80} y={row * 80} />
      <Circle
        fill={color}
        fillOpacity={isCandidate ? (showHint ? '0.3' : '0') : '1'}
        cx={col * 80 + 40}
        cy={row * 80 + 40}
        r={30}
      />
    </>
  )
}

export default Chess
