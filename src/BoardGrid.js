import BoardColumn from './BoardColumn'
import BoardRow from './BoardRow'
import React from 'react'
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
