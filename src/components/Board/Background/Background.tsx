import { memo, ReactElement } from 'react'

import { Base } from './Base'
import { Grid } from './Grid'

export function _Background(): ReactElement {
  return (
    <>
      <Base />
      <Grid />
    </>
  )
}

export const Background = memo(_Background)
