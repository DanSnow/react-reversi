import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { BLACK, History, Users, UserType, WHITE } from '../../store'

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
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">{t('Score')}</p>
      </div>
      <div className="card-content">
        <div>
          black({getPlayerType(BLACK, users)}): {score.black}
        </div>
        <div>
          white({getPlayerType(WHITE, users)}): {score.white}
        </div>
        <hr />
        <div>win: {history.win}</div>
        <div>lose: {history.lose}</div>
        <div>draw: {history.draw}</div>
        <hr />
        <p className="is-size-6 has-text-grey">{VERSION}</p>
      </div>
    </div>
  )
}
