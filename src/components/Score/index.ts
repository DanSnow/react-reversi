import { connect } from 'react-redux'

import { State } from '../../store/reducer'
import { createScoreSelector } from '../../store/selector'
import { Score as ScoreComponent } from './Score'

const scoreSelector = createScoreSelector()

export const Score = connect((state: State) => ({
  score: scoreSelector(state),
  ai: state.ai,
  history: state.history,
}))(ScoreComponent)
