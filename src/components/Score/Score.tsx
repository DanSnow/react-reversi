import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { BLACK, WHITE } from '../../store'

function getPlayerType(player: string, ai?: string): string {
  return player === ai ? 'ai' : 'player'
}

interface ScoreData {
  black: number
  white: number
}

interface History {
  win: number
  lose: number
  draw: number
}

interface Props {
  history: History
  ai?: string
  score: ScoreData
}

export function Score({ score, ai, history }: Props): ReactElement {
  const { t } = useTranslation()

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">{t('Score')}</p>
      </div>
      <div className="card-content">
        <div>
          black({getPlayerType(BLACK, ai)}): {score.black}
        </div>
        <div>
          white({getPlayerType(WHITE, ai)}): {score.white}
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
