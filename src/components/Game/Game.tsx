import type { ReactElement } from 'react'
import { useCallback, useState } from 'react'
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
      <div className="container">
        <div>
          <div>
            <Toolbar onOpenSetting={openSetting} />
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex flex-col">
                <Board hint={hint} />
                <span className="self-end text-red-600">{message}</span>
              </div>
              <Score />
              <div className="hidden grow lg:block">
                <Log />
              </div>
            </div>
          </div>
        </div>
        <Confirm open={showReplay} onConfirm={reboot} onCancel={resetState}>
          {t('Play Again?') as string}
        </Confirm>
        <SettingModal
          isOpen={settingOpen}
          onClose={closeSetting}
          onHintChange={(checked) => setHint(checked)}
          onRetractChange={(checked) => setAllowRetract(checked)}
          onVersionChange={(version) => setVersion(version)}
        />
      </div>
      <GithubCorner href="https://github.com/DanSnow/react-reversi" />
    </>
  )
}
