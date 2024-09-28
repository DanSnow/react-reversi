import type { ReactElement } from 'react'

import { useAtomValue } from 'jotai'
import { logAtom } from '~/atoms/game'
import { Log as DumbLog } from './Log'

export function Log(): ReactElement {
  const log = useAtomValue(logAtom)

  return <DumbLog log={log} />
}
