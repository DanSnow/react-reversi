import { ReactElement, useCallback, useState } from 'react'
import GithubCorner from 'react-github-corner'
import { useTranslation } from 'react-i18next'

import { Board } from '../Board'
import { Confirm } from '../Confirm'
import { Log } from '../Log'
import { Score } from '../Score'
import { SettingModal } from '../SettingModal'
import { Toolbar } from '../Toolbar'

interface Props {
  message: string
  showReplay: boolean
  setAllowRetract: (allow: boolean) => void
  resetState: () => void
  setVersion: (version: string) => void
  reboot: () => void
}

export function Game({ showReplay, message, reboot, setVersion, setAllowRetract, resetState }: Props): ReactElement {
  const [hint, setHint] = useState(false)
  const [settingOpen, setSettingOpen] = useState(false)
  const openSetting = useCallback(() => setSettingOpen(true), [])
  const closeSetting = useCallback(() => setSettingOpen(false), [])

  const { t } = useTranslation()

  return (
    <>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column is-6 is-offset-2">
            <Toolbar onOpenSetting={openSetting} />
            <div className="columns">
              <div className="column">
                <Board hint={hint} />
                <span className="is-pulled-right">{message}</span>
              </div>
              <div className="column">
                <Score />
              </div>
            </div>
          </div>
          <div className="column is-2 is-hidden-touch">
            <Log />
          </div>
        </div>
        <Confirm open={showReplay} onConfirm={reboot} onCancel={resetState}>
          {t('Play Again?') as string}
        </Confirm>
        <SettingModal
          isOpen={settingOpen}
          onClose={closeSetting}
          onHintChange={(event) => setHint(event.target.checked)}
          onRetractChange={(event) => setAllowRetract(event.target.checked)}
          onVersionChange={(event) => setVersion(event.target.value)}
        />
      </div>
      <GithubCorner href="https://github.com/DanSnow/react-reversi" />
    </>
  )
}
