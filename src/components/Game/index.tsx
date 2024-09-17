import type { ReactElement } from 'react'
import { useAtomValue } from 'jotai'

import { useCallback } from 'react'
import { overlayAtom } from '~/atoms/ui'
import { useDispatch, useSelector } from '../../hooks'
import { ENDED, gameActions, IDLE, reboot } from '../../store'
import { Game as DumbGame } from './Game'

export function Game(): ReactElement {
  const message = useSelector((state) => state.game.message)
  const overlay = useAtomValue(overlayAtom)
  const showReplay = useSelector((state) => state.game.state === ENDED && !overlay)
  const dispatch = useDispatch()
  const setAllowRetract = useCallback(
    (allow: boolean) => {
      if (!allow) {
        dispatch(gameActions.setRetractStep(0))
        return
      }
      dispatch(gameActions.setRetractStep(3))
    },
    [dispatch],
  )

  return (
    <DumbGame
      message={message}
      showReplay={showReplay}
      setVersion={(version: 'v1' | 'v2') => dispatch(gameActions.setVersion(version))}
      resetState={() => dispatch(gameActions.setState(IDLE))}
      reboot={() => dispatch(reboot())}
      setAllowRetract={setAllowRetract}
    />
  )
}
