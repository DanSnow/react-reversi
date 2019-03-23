import React from 'react'

interface Props {
  col: number
}

export default function BoardColumn ({ col }: Props) {
  return <line stroke='black' strokeWidth='1px' x1={col * 80} x2={col * 80} y1='0' y2='640' />
}
