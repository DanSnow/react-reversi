import { times } from 'lodash-es'

import BoardColumn from './BoardColumn'
import BoardRow from './BoardRow'

function BoardGrid() {
  return (
    <>
      {times(9, (i) => (
        <BoardRow key={i} row={i} />
      ))}
      {times(9, (i) => (
        <BoardColumn key={i} col={i} />
      ))}
    </>
  )
}

export default BoardGrid
