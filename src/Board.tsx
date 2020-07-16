import { BLACK_CANDIDATE, WHITE, WHITE_CANDIDATE } from './consts'
import React, { Fragment } from 'react'
import { reset, setOverlay, userPlaceChess } from './actions'

import BoardBackground from './BoardBackground'
import BoardGrid from './BoardGrid'
import Chess from './Chess'
import { ColorButtons } from './ColorButtons'
import { State } from './reducer'
import StaticContainer from 'react-static-container'
import { connect } from 'react-redux'
import { flatMap } from 'lodash-es'
import { startedSelector } from './selector'
import styled from '@emotion/styled'

const Overlay = styled.text({
  fill: 'red',
  fontSize: '8em',
  pointerEvents: 'none',
  textAnchor: 'middle',
})

interface Props {
  board: (null | string)[][]
  started: boolean
  overlay: string
  hint: boolean
  reset: () => void
  placeChess: (row: number, col: number) => void
}

function Board({ reset, placeChess, board, hint, started, overlay }: Props) {
  return (
    <svg height="640px" width="640px">
      <StaticContainer>
        <Fragment>
          <BoardBackground />
          <BoardGrid />
        </Fragment>
      </StaticContainer>
      {flatMap(board, (r, row) =>
        r.map((c, col) =>
          c ? (
            <Chess
              key={row * 8 + col}
              row={row}
              col={col}
              hint={hint}
              color={c === WHITE || c === WHITE_CANDIDATE ? 'white' : 'black'}
              candidate={c === WHITE_CANDIDATE || c === BLACK_CANDIDATE}
              onClick={placeChess}
            />
          ) : null
        )
      )}
      {started || <ColorButtons onClick={reset} />}
      {!!overlay && (
        <Overlay x="50%" y="50%">
          {overlay}
        </Overlay>
      )}
    </svg>
  )
}

export default connect(
  (state: State) => ({
    board: state.board,
    started: startedSelector(state),
    overlay: state.overlay,
  }),
  {
    reset,
    userPlaceChess,
    setOverlay,
  },
  (state, actions, props) => {
    return {
      ...state,
      ...actions,
      ...props,
      placeChess(row, col) {
        if (state.overlay) {
          actions.setOverlay('')
        }
        if (!state.started) {
          return
        }
        console.log('(Row, Col): (', row, ', ', col, ')')
        actions.userPlaceChess(row, col)
      },
    }
  }
)(Board)
