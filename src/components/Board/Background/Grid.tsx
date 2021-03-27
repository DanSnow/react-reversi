import { times } from 'lodash-es'
import { ReactElement } from 'react'

import { Column } from './Column'
import { Row } from './Row'

export function Grid(): ReactElement {
  return (
    <>
      {times(9, (i) => (
        <Row key={i} row={i} />
      ))}
      {times(9, (i) => (
        <Column key={i} col={i} />
      ))}
    </>
  )
}
