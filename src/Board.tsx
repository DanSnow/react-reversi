import styled from '@emotion/styled'
import { flatMap } from 'lodash-es'
import React from 'react'
import { connect } from 'react-redux'
import StaticContainer from 'react-static-container'

import { reset, setOverlay, userPlaceChess } from './actions'
import BoardBackground from './BoardBackground'
import BoardGrid from './BoardGrid'
import Chess from './Chess'
import { ColorButtons } from './ColorButtons'
import { BLACK_CANDIDATE, WHITE, WHITE_CANDIDATE } from './consts'
import { State } from './reducer'
import { startedSelector } from './selector'

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
        <>
          <BoardBackground />
          <BoardGrid />
        </>
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
