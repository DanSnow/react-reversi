import { BLACK_CANDIDATE, WHITE, WHITE_CANDIDATE } from './consts'
import React, { Component } from 'react'
import { reset, setOverlay, userPlaceChess } from './actions'

import BoardBackground from './BoardBackground'
import BoardGrid from './BoardGrid'
import Chess from './Chess'
import { ColorButtons } from './ColorButtons'
import PropTypes from 'prop-types'
import StaticContainer from 'react-static-container'
import { connect } from 'react-redux'
import { flatMap } from 'lodash-es'
import { startedSelector } from './selector'
import styled from '@emotion/styled'

const Overlay = styled.text({
  fill: 'red',
  fontSize: '8em',
  pointerEvents: 'none',
  textAnchor: 'middle'
})

class Board extends Component {
  handleClick = (_event, row, col) => {
    if (this.props.overlay) {
      this.props.setOverlay('')
    }
    if (!this.props.started) {
      return
    }
    console.log('(Row, Col): (', row, ', ', col, ')')
    this.props.userPlaceChess(row, col)
  }

  render () {
    const { board, hint, started, overlay } = this.props

    return (
      <svg height='640px' width='640px'>
        <StaticContainer>
          <>
            <BoardBackground onClick={this.handleClick} />
            <BoardGrid />
          </>
        </StaticContainer>
        {flatMap(board, (r, row) =>
          r.map(
            (c, col) =>
              c ? (
                <Chess
                  key={row * 8 + col}
                  row={row}
                  col={col}
                  hint={hint}
                  color={c === WHITE || c === WHITE_CANDIDATE ? 'white' : 'black'}
                  candiate={c === WHITE_CANDIDATE || c === BLACK_CANDIDATE}
                  onClick={this.handleClick}
                />
              ) : null
          )
        )}
        {started || <ColorButtons onClick={this.props.reset} />}
        {!!overlay && (
          <Overlay x='50%' y='50%'>
            {overlay}
          </Overlay>
        )}
      </svg>
    )
  }

  static propTypes = {
    board: PropTypes.array.isRequired,
    started: PropTypes.bool.isRequired,
    overlay: PropTypes.string.isRequired,
    hint: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    setOverlay: PropTypes.func.isRequired,
    userPlaceChess: PropTypes.func.isRequired
  }
}

export default connect(
  state => ({
    board: state.board,
    started: startedSelector(state),
    overlay: state.overlay
  }),
  {
    reset,
    userPlaceChess,
    setOverlay
  }
)(Board)
