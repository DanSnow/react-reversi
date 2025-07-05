import type { ReactElement } from 'react'

import type { Log as LogData } from '~/types'
import { Log as DumbLog } from './Log'

export function Log({ log }: { log: LogData[] }): ReactElement {
  return <DumbLog log={log} />
}
