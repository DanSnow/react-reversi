import type { ReactElement } from 'react'

import { useAtomValue } from 'jotai'
import { scoreAtom, usersAtom } from '~/atoms/game'
import { historyAtom } from '~/atoms/ui'
import { Score as DumbScore } from './Score'

export function Score(): ReactElement {
  const score = useAtomValue(scoreAtom)
  const users = useAtomValue(usersAtom)
  const history = useAtomValue(historyAtom)

  return <DumbScore score={score} users={users} history={history} />
}
