import { BLACK, WHITE } from './consts'

import { ColorButton } from './ColorButton'
import React from 'react'

export function ColorButtons ({ onClick }) {
  return (
    <>
      <ColorButton
        color='white'
        background='black'
        x={160}
        y={300}
        value={WHITE}
        onClick={onClick}
      >
        Black
      </ColorButton>
      <ColorButton
        color='black'
        background='white'
        x={480}
        y={300}
        value={BLACK}
        onClick={onClick}
      >
        White
      </ColorButton>
    </>
  )
}
