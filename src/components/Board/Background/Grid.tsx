import type { ReactElement } from 'react'
import { Array } from 'effect'

import { Column } from './Column'
import { Row } from './Row'

export function Grid(): ReactElement {
  return (
    <>
      {Array.makeBy(9, (i) => (
        <Row key={i} row={i} />
      ))}
      {Array.makeBy(9, (i) => (
        <Column key={i} col={i} />
      ))}
    </>
  )
}
