import type { ReactElement } from 'react'
import type { History, Users } from '~/types'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { BLACK, WHITE } from '~/consts'
import { m } from '~/paraglide/messages'
import { UserType } from '~/types'

function getPlayerType(player: keyof Users, users: Users): string {
  return users[player] === UserType.AI ? 'ai' : 'player'
}

interface ScoreData {
  black: number
  white: number
}

export interface ScoreProps {
  history: History
  users: Users
  score: ScoreData
}

export function Score({ score, users, history }: ScoreProps): ReactElement {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <CardTitle>{m.score()}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-1 text-sm">
        <div>
          black({getPlayerType(BLACK, users)}): {score.black}
        </div>
        <div>
          white({getPlayerType(WHITE, users)}): {score.white}
        </div>
        <Separator />
        <div>win: {history.win}</div>
        <div>lose: {history.lose}</div>
        <div>draw: {history.draw}</div>
      </CardContent>
    </Card>
  )
}
