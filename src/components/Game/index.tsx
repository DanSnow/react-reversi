import { ReactElement, useCallback } from 'react'

import { useDispatch, useSelector } from '../../hooks'
import { ENDED, gameActions, IDLE, reboot } from '../../store'
import { Game as DumbGame } from './Game'

export function Game(): ReactElement {
  const message = useSelector((state) => state.game.message)
  const ai = useSelector((state) => state.game.ai)
  const showReplay = useSelector((state) => state.game.state === ENDED && !state.ui.overlay)
  const dispatch = useDispatch()
  const setAllowRetract = useCallback(
    (allow: boolean) => {
      if (!allow) {
        dispatch(gameActions.setRetractStep(0))
        return
      }
      if (ai) {
        dispatch(gameActions.setRetractStep(3))
      } else {
        dispatch(gameActions.setRetractStep(3))
      }
    },
    [dispatch, ai]
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
