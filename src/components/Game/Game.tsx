import type { ReactElement, ReactNode } from 'react'
import type { ScoreProps } from '../Score'

import type { AIVersions } from '~/lib/ai/core'
import { useCallback, useState } from 'react'
import GithubCorner from 'react-github-corner'
import { useTranslation } from 'react-i18next'
import { Confirm } from '../Confirm'
import { Log } from '../Log'
import { Score } from '../Score'
import { SettingModal } from '../SettingModal'
import { Toolbar } from '../Toolbar'
import { Log as LogData } from '~/types'

export interface Props extends ScoreProps {
  message: string
  children: ReactNode
  showReplay: boolean
  log: LogData[]
  setAllowRetract: (allow: boolean) => void
  onRestart: () => void
  setVersion: (version: AIVersions) => void
}

export function Game({
  showReplay,
  message,
  children,
  setVersion,
  setAllowRetract,
  onRestart,
  users,
  log,
  score,
}: Props): ReactElement {
  const [hint, setHint] = useState(false)
  const [settingOpen, setSettingOpen] = useState(false)
  const openSetting = useCallback(() => setSettingOpen(true), [])
  const closeSetting = useCallback(() => setSettingOpen(false), [])

  const { t } = useTranslation()

  return (
    <>
      <div className="container">
        <Toolbar onOpenSetting={openSetting} />
        <div className="flex flex-col items-start gap-4 md:flex-row">
          <div className="flex flex-col">
            {children}
            <span className="self-end text-red-600">{message}</span>
          </div>
          <Score users={users} score={score} />
          <div className="hidden grow max-w-64 lg:block">
            <Log log={log} />
          </div>
        </div>
        <Confirm open={showReplay} onConfirm={onRestart} onCancel={closeSetting}>
          {t('Play Again?')}
        </Confirm>
        <SettingModal
          isOpen={settingOpen}
          onClose={closeSetting}
          onHintChange={(checked) => setHint(checked)}
          onRetractChange={(checked) => setAllowRetract(checked)}
          onVersionChange={(version) => setVersion(version)}
        />
      </div>
      {/* <GithubCorner href="https://github.com/DanSnow/react-reversi" /> */}
    </>
  )
}
