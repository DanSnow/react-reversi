import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'
import flatMap from 'lodash/flatMap'
import { reset, userPlaceChess } from './actions'
import BoardBackground from './BoardBackground'
import BoardGrid from './BoardGrid'
import Chess from './Chess'
import { WHITE, WHITE_CANDIDATE, BLACK_CANDIDATE } from './consts'

@connect((state) => ({ board: state.board }), { reset, userPlaceChess })
export default class Board extends Component {
  componentDidMount() {
    this.props.reset()
  }

  @bind
  handleClick(_event, row, col) {
    console.log('(Row, Col): (', row, ', ', col, ')')
    this.props.userPlaceChess(row, col)
  }

  render() {
    const { board, hint } = this.props
    return (
      <svg height='640px' width='640px'>
        <BoardBackground onClick={ this.handleClick } />
        <BoardGrid />
        {
          flatMap(board, (r, row) => r.map((c, col) => (c ? (
            <Chess
              key={ row * 8 + col }
              onClick={ this.handleClick }
              row={ row }
              col={ col }
              hint={ hint }
              color={ c === WHITE || c === WHITE_CANDIDATE ? 'white' : 'black' }
              candiate={ c === WHITE_CANDIDATE || c === BLACK_CANDIDATE } />
          ) : null)))
        }
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
