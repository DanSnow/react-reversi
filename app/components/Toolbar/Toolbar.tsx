import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import IconCog from '~icons/fa-solid/cog'
import IconPoweroff from '~icons/fa-solid/power-off'
import IconUndo from '~icons/fa-solid/undo'
import IconUserFriends from '~icons/fa-solid/user-friends'
import { IconButton } from '../ui/icon-button'

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
    <nav className="flex justify-between p-2 pr-16">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{t('Reversi')}</h1>
      <div className="flex gap-2 ">
        <IconButton icon={<IconUserFriends />} onClick={setHuman}>
          <span>{t('Play with friend')}</span>
        </IconButton>
        <IconButton icon={<IconPoweroff />} onClick={reboot}>
          <span>{t('Restart')}</span>
        </IconButton>
        <IconButton icon={<IconUndo />} disabled={!allowRetract} onClick={restoreStep} />
        <IconButton icon={<IconCog />} onClick={onOpenSetting} />
      </div>
    </nav>
  )
}
