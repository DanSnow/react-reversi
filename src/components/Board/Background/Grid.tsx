import { times } from 'rambda'
import type { ReactElement } from 'react'

import { Column } from './Column'
import { Row } from './Row'

export function Grid(): ReactElement {
  return (
    <>
      {times(
        (i) => (
          <Row key={i} row={i} />
        ),
        9,
      )}
      {times(
        (i) => (
          <Column key={i} col={i} />
        ),
        9,
      )}
    </>
  )
}
