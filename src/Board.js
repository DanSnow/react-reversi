import {BLACK_CANDIDATE, WHITE, WHITE_CANDIDATE} from './consts'
import React, {Component} from 'react'
import {reset, userPlaceChess} from './actions'

import BoardBackground from './BoardBackground'
import BoardGrid from './BoardGrid'
import Chess from './Chess'
import PropTypes from 'prop-types'
import StaticContainer from 'react-static-container'
import {connect} from 'react-redux'
import flatMap from 'lodash/flatMap'

class Board extends Component {
  componentDidMount () {
    this.props.reset(WHITE)
  }

  handleClick = (_event, row, col) => {
    console.log('(Row, Col): (', row, ', ', col, ')')
    this.props.userPlaceChess(row, col)
  }

  render () {
    const {board, hint} = this.props
    return (
      <svg height='640px' width='640px'>
        <StaticContainer>
          <g>
            <BoardBackground onClick={this.handleClick} />
            <BoardGrid />
          </g>
        </StaticContainer>
        {flatMap(board, (r, row) =>
          r.map(
            (c, col) =>
              c ? (
                <Chess
                  key={row * 8 + col}
                  onClick={this.handleClick}
                  row={row}
                  col={col}
                  hint={hint}
                  color={
                    c === WHITE || c === WHITE_CANDIDATE ? 'white' : 'black'
                  }
                  candiate={c === WHITE_CANDIDATE || c === BLACK_CANDIDATE}
                />
              ) : null
          )
        )}
      </svg>
    )
  }

  static propTypes = {
    board: PropTypes.array.isRequired,
    hint: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    userPlaceChess: PropTypes.func.isRequired
  }
}

export default connect(state => ({board: state.board}), {
  reset,
  userPlaceChess
})(Board)
