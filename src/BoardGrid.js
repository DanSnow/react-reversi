import React from 'react'
import BoardRow from './BoardRow'
import BoardColumn from './BoardColumn'
import times from 'lodash/times'

function BoardGrid () {
  return (
    <g>
      {times(9, i => <BoardRow key={i} row={i} />)}
      {times(9, i => <BoardColumn key={i} col={i} />)}
    </g>
  )
}

export default BoardGrid
