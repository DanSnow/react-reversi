import { BLACK, WHITE } from './consts'

import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { scoreSelector } from './selector'

function getPlayerType (player, ai) {
  return player === ai ? 'ai' : 'player'
}

function Score ({ score, ai, history }) {
  return (
    <div className='card'>
      <div className='card-header'>
        <p className='card-header-title'>Score</p>
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
  history: PropTypes.object.isRequired
}

export default connect(state => ({
  score: scoreSelector(state),
  ai: state.ai,
  history: state.history
}))(Score)
