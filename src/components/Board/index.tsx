import { ReactElement, useCallback } from 'react'

import { useDispatch, useSelector } from '../../hooks'
import { reset, startedSelector, uiActions, userPlaceChess } from '../../store'
import { Board as DumbBoard } from './Board'

interface Props {
  hint: boolean
}

export function Board({ hint }: Props): ReactElement {
  const board = useSelector((state) => state.game.board)
  const started = useSelector(startedSelector)
  const overlay = useSelector((state) => state.ui.overlay)
  const dispatch = useDispatch()
  const placeChess = useCallback(
    (row: number, col: number): void => {
      if (overlay) {
        dispatch(uiActions.setOverlay(''))
      }
      if (!started) {
        return
      }
      dispatch(userPlaceChess(row, col))
    },
    [dispatch, overlay, started]
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
