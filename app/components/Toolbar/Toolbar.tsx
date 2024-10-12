import type { ReactElement } from 'react'
import { Icon } from '@iconify-icon/react'
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
    <nav className="flex justify-between pr-16">
      <div>
        <div className="p-2">
          <p className="text-4xl font-bold tracking-tight lg:text-5xl">{t('Reversi')}</p>
        </div>
      </div>
      <div>
        <div className="flex gap-2 p-2">
          <Button onClick={setHuman}>
            <span className="mr-1">
              <Icon icon="fa-solid:user-friends" />
            </span>
            <span>{t('Play with friend')}</span>
          </Button>
          <Button onClick={reboot}>
            <span className="mr-1">
              <Icon icon="fa-solid:power-off" />
            </span>
            <span>{t('Restart')}</span>
          </Button>
          <Button disabled={!allowRetract} onClick={restoreStep}>
            <span>
              <Icon icon="fa-solid:undo" />
            </span>
          </Button>
          <Button onClick={onOpenSetting}>
            <span>
              <Icon icon="fa-solid:cog" />
            </span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
