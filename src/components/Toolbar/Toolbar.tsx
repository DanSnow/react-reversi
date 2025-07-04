import type { ReactElement } from 'react'
import IconCog from '~icons/fa-solid/cog'
import IconPoweroff from '~icons/fa-solid/power-off'
import IconUndo from '~icons/fa-solid/undo'
import IconUserFriends from '~icons/fa-solid/user-friends'
import { m } from '~/paraglide/messages'
import { IconButton } from '../ui/icon-button'

export interface Props {
  allowRetract: boolean
  onOpenSetting: () => void
  setHuman: () => void
  reboot: () => void
  onUndo: () => void // Added onUndo prop
}

export function Toolbar({ setHuman, reboot, allowRetract, onUndo, onOpenSetting }: Props): ReactElement {
  // Removed restoreStep, added onUndo

  return (
    <nav className="flex justify-between p-2 pr-16">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{m.reversi()}</h1>
      <div className="flex gap-2 ">
        <IconButton icon={<IconUserFriends />} onClick={setHuman}>
          <span>{m.play_with_friend()}</span>
        </IconButton>
        <IconButton icon={<IconPoweroff />} onClick={reboot}>
          <span>{m.restart()}</span>
        </IconButton>
        <IconButton icon={<IconUndo />} disabled={!allowRetract} onClick={onUndo} /> {/* Changed onClick to onUndo */}
        <IconButton icon={<IconCog />} onClick={onOpenSetting} />
      </div>
    </nav>
  )
}
