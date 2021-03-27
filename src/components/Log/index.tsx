import { ReactElement } from 'react'

import { useSelector } from '../../hooks'
import { Log as DumbLog } from './Log'

export function Log(): ReactElement {
  const log = useSelector((state) => state.game.log)

  return <DumbLog log={log} />
}
