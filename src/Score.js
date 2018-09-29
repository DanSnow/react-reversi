import { BLACK, WHITE } from './consts'

import PropTypes from 'prop-types'
import React from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { createScoreSelector } from './selector'
import { translate } from 'react-i18next'

function getPlayerType (player, ai) {
  return player === ai ? 'ai' : 'player'
}

function Score ({ score, ai, history, t }) {
  return (
    <div className='card'>
      <div className='card-header'>
        <p className='card-header-title'>{t('Score')}</p>
      </div>
      <div className='card-content'>
        <div>
          black({getPlayerType(BLACK, ai)}): {score.black}
        </div>
        <div>
          white({getPlayerType(WHITE, ai)}): {score.white}
        </div>
        <hr />
        <div>win: {history.win}</div>
        <div>lose: {history.lose}</div>
        <div>draw: {history.draw}</div>
        <hr />
        <p className='is-size-6 has-text-grey'>{VERSION}</p>
      </div>
    </div>
  )
}

Score.propTypes = {
  ai: PropTypes.string,
  score: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

const scoreSelector = createScoreSelector()

export default compose(
  connect(state => ({
    score: scoreSelector(state),
    ai: state.ai,
    history: state.history
  })),
  translate()
)(Score)
