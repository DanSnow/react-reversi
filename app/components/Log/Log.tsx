import type { ReactElement } from 'react'
import { Player, type Log as LogData } from '~/types'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import WhiteChess from '~icons/fa-regular/circle'
import BlackChess from '~icons/fa-solid/circle'

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
          <div key={idx} className="flex items-center gap-1">
            {player === Player.WHITE ? <WhiteChess /> : <BlackChess className="text-black" />}
            <span>{pos}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)
