import React, {Fragment} from 'react'

import BoardColumn from './BoardColumn'
import BoardRow from './BoardRow'
import {times} from 'lodash-es'

function BoardGrid () {
  return (
    <Fragment>
      {times(9, i => <BoardRow key={i} row={i} />)}
      {times(9, i => <BoardColumn key={i} col={i} />)}
    </Fragment>
  )
}

export default BoardGrid
