import type { ReactElement, ReactNode } from 'react'
import type { ScoreProps } from '../Score'

import type { Log as LogData } from '~/types'
import { ClientOnly } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import GithubCorner from 'react-github-corner'
import { m } from '~/paraglide/messages'
import { AppInfo } from '../AppInfo'
import { Confirm } from '../Confirm'
import { Log } from '../Log'
import { Score } from '../Score'
import { SettingModal } from '../SettingModel'
import { Toolbar } from '../Toolbar'

export interface Props extends ScoreProps {
  message: string
  children: ReactNode
  showReplay: boolean
  log: LogData[]
  onRestart: () => void
  onCloseConfirm: () => void
  allowRetract: boolean // Added allowRetract prop
  setHuman: () => void // Added setHuman prop
  reboot: () => void // Added reboot prop
  onUndo: () => void // Added onUndo prop
}

export function Game({
  showReplay,
  message,
  children,
  onRestart,
  users,
  log,
  score,
  onCloseConfirm,
  allowRetract, // Added allowRetract
  setHuman, // Added setHuman
  reboot, // Added reboot
  onUndo, // Added onUndo
}: Props): ReactElement {
  const [settingOpen, setSettingOpen] = useState(false)
  const openSetting = useCallback(() => setSettingOpen(true), [])
  const closeSetting = useCallback(() => setSettingOpen(false), [])

  return (
    <>
      <div className="container">
        {/* Pass new props to Toolbar */}
        <Toolbar
          onOpenSetting={openSetting}
          allowRetract={allowRetract}
          setHuman={setHuman}
          reboot={reboot}
          onUndo={onUndo}
        />
        <div className="flex flex-col items-start gap-4 md:flex-row">
          <div className="flex flex-col">
            {children}
            <span className="text-destructive self-end">{message}</span>
          </div>
          <div>
            <Score users={users} score={score} />
            <AppInfo />
          </div>
          <div className="hidden max-w-64 grow lg:block">
            <Log log={log} />
          </div>
        </div>
        <Confirm open={showReplay} onConfirm={onRestart} onCancel={onCloseConfirm}>
          {m.play_again()}
        </Confirm>
        <SettingModal isOpen={settingOpen} onClose={closeSetting} />
      </div>
      <ClientOnly>
        <GithubCorner href="https://github.com/DanSnow/react-reversi" />
      </ClientOnly>
    </>
  )
}
