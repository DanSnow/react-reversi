import type { ReactElement } from 'react'

import type { Props } from './Toolbar'
import { Toolbar as DumbToolbar } from './Toolbar'

export function Toolbar(props: Props): ReactElement {
  return <DumbToolbar {...props} />
}
