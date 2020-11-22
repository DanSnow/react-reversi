import { useCallback, useState } from 'react'
import GithubCorner from 'react-github-corner'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { reboot, setRetractStep, setState, setVersion } from './actions'
import Board from './Board'
import { Confirm } from './Confirm'
import { ENDED, IDLE } from './consts'
import Log from './Log'
import { State } from './reducer'
import Score from './Score'
import SettingModal from './SettingModal'
import Toolbar from './Toolbar'

interface Props {
  message: string
  showReplay: boolean
  setAllowRetract: (allow: boolean) => void
  resetState: () => void
  setVersion: (version: string) => void
  reboot: () => void
}

function Game({ showReplay, message, reboot, setVersion, setAllowRetract, resetState }: Props) {
  const [hint, setHint] = useState(false)
  const [settingOpen, setSettingOpen] = useState(false)
  const openSetting = useCallback(() => setSettingOpen(true), [])
  const closeSetting = useCallback(() => setSettingOpen(false), [])

  const { t } = useTranslation()

  return (
    <>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column is-6 is-offset-2">
            <Toolbar onOpenSetting={openSetting} />
            <div className="columns">
              <div className="column">
                <Board hint={hint} />
                <span className="is-pulled-right">{message}</span>
              </div>
              <div className="column">
                <Score />
              </div>
            </div>
          </div>
          <div className="column is-2 is-hidden-touch">
            <Log />
          </div>
        </div>
        <Confirm open={showReplay} onConfirm={reboot} onCancel={resetState}>
          {t('Play Again?') as string}
        </Confirm>
        <SettingModal
          isOpen={settingOpen}
          onClose={closeSetting}
          onHintChange={(event) => setHint(event.target.checked)}
          onRetractChange={(event) => setAllowRetract(event.target.checked)}
          onVersionChange={(event) => setVersion(event.target.value)}
        />
      </div>
      <GithubCorner href="https://github.com/DanSnow/react-reversi" />
    </>
  )
}

export default connect(
  (state: State) => ({
    message: state.message,
    ai: state.ai,
    showReplay: state.state === ENDED && !state.overlay,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        setVersion,
        setRetractStep,
        reboot,
        resetState: setState.bind(null, IDLE),
      },
      dispatch
    ),
  (stateProps, { setRetractStep, ...dispatchProps }, ownProps): Props => {
    return Object.assign({}, stateProps, dispatchProps, ownProps, {
      setAllowRetract(allow: boolean): void {
        if (allow) {
          if (stateProps.ai) {
            setRetractStep(3)
          } else {
            setRetractStep(6)
          }
        } else {
          setRetractStep(0)
        }
      },
    })
  }
)(Game)
