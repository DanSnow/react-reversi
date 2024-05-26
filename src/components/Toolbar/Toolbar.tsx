import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'

export interface Props {
  allowRetract: boolean
  onOpenSetting: () => void
  setHuman: () => void
  reboot: () => void
  restoreStep: () => void
}

export function Toolbar({ setHuman, reboot, allowRetract, restoreStep, onOpenSetting }: Props): ReactElement {
  const { t } = useTranslation()

  return (
    <nav className="flex justify-between">
      <div>
        <div className="p-2">
          <p className="text-4xl font-bold tracking-tight lg:text-5xl">{t('Reversi')}</p>
        </div>
      </div>
      <div>
        <div className="flex gap-2 p-2">
          <Button onClick={setHuman}>
            <span className="mr-1">
              <i className="fas fa-user-friends" />
            </span>
            <span>{t('Play with friend')}</span>
          </Button>
          <Button onClick={reboot}>
            <span className="mr-1">
              <i className="fas fa-power-off" />
            </span>
            <span>{t('Restart')}</span>
          </Button>
          <Button disabled={!allowRetract} onClick={restoreStep}>
            <span>
              <i className="fas fa-undo" />
            </span>
          </Button>
          <Button onClick={onOpenSetting}>
            <span>
              <i className="fas fa-cog" />
            </span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
