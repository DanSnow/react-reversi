import type { ReactElement } from 'react'
import { memo } from 'react'

import { Base } from './Base'
import { Grid } from './Grid'

function _Background(): ReactElement {
  return (
    <>
      <Base />
      <Grid />
    </>
  )
}

export const Background = memo(_Background)
