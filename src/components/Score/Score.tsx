import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import type { History, Users } from '../../store'
import { BLACK, UserType, WHITE } from '../../store'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'

function getPlayerType(player: string, users: Users): string {
  return users[player] === UserType.AI ? 'ai' : 'player'
}

interface ScoreData {
  black: number
  white: number
}

interface Props {
  history: History
  users: Users
  score: ScoreData
}

export function Score({ score, users, history }: Props): ReactElement {
  const { t } = useTranslation()

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <CardTitle>{t('Score')}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
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
        <Separator />
        <p className="is-size-6 has-text-grey">{VERSION}</p>
      </CardContent>
    </Card>
  )
}
