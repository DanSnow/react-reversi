import styled from '@emotion/styled'
import { ReactElement, useCallback } from 'react'

const Circle = styled.circle({
  pointerEvents: 'none',
})

interface Props {
  color: string
  hint: boolean
  row: number
  col: number
  candidate: boolean
  onClick: (row: number, col: number) => void
}

function Chess({ color, row, col, candidate, hint, onClick }: Props): ReactElement {
  const handleClick = useCallback(() => {
    onClick(row, col)
  }, [row, col, onClick])

  return (
    <>
      <rect onClick={handleClick} width="80" height="80" fillOpacity="0" x={col * 80} y={row * 80} />
      <Circle
        fill={color}
        fillOpacity={candidate ? (hint ? '0.3' : '0') : '1'}
        cx={col * 80 + 40}
        cy={row * 80 + 40}
        r={30}
      />
    </>
  )
}

export default Chess
