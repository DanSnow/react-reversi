import type { ReactElement } from 'react'
import type { Log as LogData } from '../../store'

import cx from 'clsx'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { WHITE } from '../../store'

interface Props {
  log: LogData[]
}

export const Log = ({ log }: Props): ReactElement => (
  <Card>
    <CardHeader>
      <CardTitle>Log</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[600px] overflow-auto px-4">
        {log.map(({ player, pos }, idx) => (
          <div key={idx} className="is-flex">
            <span className="icon">
              <i className={cx(player === WHITE ? 'far' : 'fas', 'fa-circle')} />
            </span>
            <span>{pos}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)
