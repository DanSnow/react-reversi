import type { ReactElement } from 'react'

import type { Props as DumbProps } from './Toolbar'
import { Toolbar as DumbToolbar } from './Toolbar'

type Props = Pick<DumbProps, 'onOpenSetting'>

export function Toolbar(props: Props): ReactElement {
  return <DumbToolbar {...props} />
}
