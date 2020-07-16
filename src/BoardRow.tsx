import React from 'react'

interface Props {
  row: number
}

export default function BoardRow({ row }: Props) {
  return <line stroke="black" strokeWidth="1px" y1={row * 80} y2={row * 80} x1="0" x2="640" />
}
