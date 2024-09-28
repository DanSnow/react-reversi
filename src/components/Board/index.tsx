import type { ReactElement } from 'react'
import { useAtom, useAtomValue } from 'jotai'

import { useCallback } from 'react'
import { boardAtom, playerAtom } from '~/atoms/game'
import { overlayAtom } from '~/atoms/ui'
import { useDispatch } from '../../hooks'
import { reset, userPlaceChess } from '../../store'
import { Board as DumbBoard } from './Board'

interface Props {
  hint: boolean
}

export function Board({ hint }: Props): ReactElement {
  const board = useAtomValue(boardAtom)
  const player = useAtomValue(playerAtom)
  const started = !!player
  const [overlay, setOverlay] = useAtom(overlayAtom)
  const dispatch = useDispatch()
  const placeChess = useCallback(
    (row: number, col: number): void => {
      if (overlay) {
        setOverlay('')
      }
      if (!started) {
        return
      }
      dispatch(userPlaceChess(row, col))
    },
    [dispatch, overlay, started],
  )

  return (
    <DumbBoard
      board={board}
      showChooseColor={started}
      hint={hint}
      overlay={overlay}
      reset={(player: string) => dispatch(reset(player))}
      placeChess={placeChess}
    />
  )
}
