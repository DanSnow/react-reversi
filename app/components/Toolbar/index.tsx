import type { ReactElement } from 'react'

import type { Props as DumbProps } from './Toolbar'
import { useAtomValue } from 'jotai'
import { restoreStep } from '~/atoms/actions'
import { allowRetractAtom } from '~/atoms/computed'
import { useDispatch } from '../../hooks'
import { reboot, reset } from '../../store'
import { Toolbar as DumbToolbar } from './Toolbar'

type Props = Pick<DumbProps, 'onOpenSetting'>

export function Toolbar(props: Props): ReactElement {
  const allowRetract = useAtomValue(allowRetractAtom)
  const dispatch = useDispatch()

  return (
    <DumbToolbar
      allowRetract={allowRetract}
      reboot={() => dispatch(reboot())}
      setHuman={() => dispatch(reset(null))}
      restoreStep={() => restoreStep()}
      {...props}
    />
  )
}
