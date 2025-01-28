import type { ReactElement } from 'react'

import type { ScoreProps as DumbScoreProps } from './Score'
import { useAtomValue } from 'jotai'
import { historyAtom } from '~/atoms/ui'
import { Score as DumbScore } from './Score'

export interface ScoreProps extends Omit<DumbScoreProps, 'history'> {}

export function Score({ score, users }: ScoreProps): ReactElement {
  const history = useAtomValue(historyAtom)

  return <DumbScore score={score} users={users} history={history} />
}
