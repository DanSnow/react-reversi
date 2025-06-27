import type { ReactElement } from 'react'
import type { Log as LogData } from '~/types'

import WhiteChess from '~icons/fa-regular/circle'
import BlackChess from '~icons/fa-solid/circle'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Player } from '~/types'

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
        {log.map((logEntry, idx) => (
          <div key={idx} className="flex items-center gap-1">
            {logEntry.type === 'move' ? (
              <>
                {logEntry.player === Player.WHITE ? <WhiteChess /> : <BlackChess className="text-black" />}
                <span>{logEntry.pos}</span>
              </>
            ) : (
              // Handle 'undo' type
              <span>{logEntry.message}</span>
            )}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)
