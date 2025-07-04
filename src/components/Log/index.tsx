import type { ReactElement } from 'react'

import { Log as DumbLog } from './Log'
import { Log as LogData } from '~/types'

export function Log({ log }: { log: LogData[] }): ReactElement {
  return <DumbLog log={log} />
}
