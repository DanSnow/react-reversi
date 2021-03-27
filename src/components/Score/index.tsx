import { ReactElement } from 'react'

import { useSelector } from '../../hooks'
import { createScoreSelector } from '../../store/selector'
import { Score as DumbScore } from './Score'

const scoreSelector = createScoreSelector()

export function Score(): ReactElement {
  const score = useSelector(scoreSelector)
  const ai = useSelector((state) => state.game.ai)
  const history = useSelector((state) => state.ui.history)

  return <DumbScore score={score} ai={ai} history={history} />
}
