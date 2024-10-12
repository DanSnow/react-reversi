import type { ReactElement } from 'react'

interface Props {
  row: number
}

export function Row({ row }: Props): ReactElement {
  return <line stroke="black" strokeWidth="1px" y1={row * 80} y2={row * 80} x1="0" x2="640" data-testid="row" />
}
