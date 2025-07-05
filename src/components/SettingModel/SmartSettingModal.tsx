import { useSetAtom } from 'jotai'
import { SettingModal } from './SettingModal'
import { aiVersionAtom, allowRetractAtom, showHintAtom } from '~/atoms/game'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export function SmartSettingModal(props: Props) {
  const setHint = useSetAtom(showHintAtom)
  const setAllowRetract = useSetAtom(allowRetractAtom)
  const setAIVersion = useSetAtom(aiVersionAtom)

  return (
    <SettingModal {...props} onHintChange={setHint} onRetractChange={setAllowRetract} onVersionChange={setAIVersion} />
  )
}
