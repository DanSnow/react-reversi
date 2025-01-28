import type { ReactElement } from 'react'

import { Log as DumbLog } from './Log'

export function Log(): ReactElement {
  return <DumbLog log={[]} />
}
