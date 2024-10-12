import type { ReactElement } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'

import { useCallback } from 'react'
import { showReplayAtom } from '~/atoms/computed'
import { aiVersionAtom, allowRetractStepsAtom, gameMessageAtom, gameStateAtom } from '~/atoms/game'
import type { AIVersions } from '~/store/lib/ai'
import { useDispatch } from '../../hooks'
import { IDLE, reboot } from '../../store'
import { Game as DumbGame } from './Game'

export function Game(): ReactElement {
  const message = useAtomValue(gameMessageAtom)
  const setRetractStep = useSetAtom(allowRetractStepsAtom)
  const setGameState = useSetAtom(gameStateAtom)
  const setAIVersion = useSetAtom(aiVersionAtom)
  const showReplay = useAtomValue(showReplayAtom)
  const dispatch = useDispatch()
  const setAllowRetract = useCallback(
    (allow: boolean) => {
      if (!allow) {
        setRetractStep(0)
        return
      }
      setRetractStep(3)
    },
    [dispatch],
  )

  return (
    <DumbGame
      message={message}
      showReplay={showReplay}
      setVersion={(version: AIVersions) => setAIVersion(version)}
      resetState={() => setGameState(IDLE)}
      reboot={() => dispatch(reboot())}
      setAllowRetract={setAllowRetract}
    />
  )
}
