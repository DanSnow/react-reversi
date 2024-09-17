import type { ReactElement } from 'react'

import type { Props as DumbProps } from './Toolbar'
import { useDispatch, useSelector } from '../../hooks'
import { gameActions, reboot, reset } from '../../store'
import { Toolbar as DumbToolbar } from './Toolbar'

type Props = Pick<DumbProps, 'onOpenSetting'>

export function Toolbar(props: Props): ReactElement {
  const allowRetract = useSelector((state) => !!(state.game.allowRetractStep && state.game.pastStep.length > 0))
  const dispatch = useDispatch()

  return (
    <DumbToolbar
      allowRetract={allowRetract}
      reboot={() => dispatch(reboot())}
      setHuman={() => dispatch(reset(null))}
      restoreStep={() => dispatch(gameActions.restoreStep())}
      {...props}
    />
  )
}
