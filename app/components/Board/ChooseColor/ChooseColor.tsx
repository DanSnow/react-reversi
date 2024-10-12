import type { ReactElement } from 'react'

import { BLACK, WHITE } from '../../../store'
import { ColorButton } from './ColorButton'

interface Props {
  onClick: (x: string) => void
}

export function ChooseColor({ onClick }: Props): ReactElement {
  return (
    <>
      <ColorButton color="white" background="black" x={160} y={300} value={WHITE} onClick={onClick}>
        Black
      </ColorButton>
      <ColorButton color="black" background="white" x={480} y={300} value={BLACK} onClick={onClick}>
        White
      </ColorButton>
    </>
  )
}
