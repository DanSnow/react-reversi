import type { ReactElement } from 'react'

import { useSelector } from '../../hooks'
import { createScoreSelector } from '../../store/selector'
import { Score as DumbScore } from './Score'

const scoreSelector = createScoreSelector()

export function Score(): ReactElement {
  const score = useSelector(scoreSelector)
  const users = useSelector((state) => state.game.users)
  const history = useSelector((state) => state.ui.history)

  return <DumbScore score={score} users={users} history={history} />
}
