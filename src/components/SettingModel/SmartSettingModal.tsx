import { useSetAtom } from 'jotai'
import { aiVersionAtom, allowRetractAtom, rendererAtom, showHintAtom } from '~/atoms/game'
import { SettingModal } from './SettingModal'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export function SmartSettingModal(props: Props) {
  const setHint = useSetAtom(showHintAtom)
  const setAllowRetract = useSetAtom(allowRetractAtom)
  const setAIVersion = useSetAtom(aiVersionAtom)
  const setRenderer = useSetAtom(rendererAtom)

  return (
    <SettingModal
      {...props}
      onHintChange={setHint}
      onRetractChange={setAllowRetract}
      onVersionChange={setAIVersion}
      onRendererChange={setRenderer}
    />
  )
}
