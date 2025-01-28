import type { ReactElement } from 'react'

import { Player } from '~/store'
import { ColorButton } from './ColorButton'

interface Props {
  onStart: (x: Player.Player) => void
}

export function ChooseColor({ onStart }: Props): ReactElement {
  return (
    <>
      <ColorButton color="white" background="black" x={160} y={300} value={Player.WHITE} onClick={onStart}>
        Black
      </ColorButton>
      <ColorButton color="black" background="white" x={480} y={300} value={Player.BLACK} onClick={onStart}>
        White
      </ColorButton>
    </>
  )
}
