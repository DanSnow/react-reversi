import { ENDED, IDLE } from './consts'
import React, { Component } from 'react'
import {
  reboot,
  reset,
  restoreStep,
  setRetractStep,
  setState,
  setVersion
} from './actions'

import Board from './Board'
import { Confirm } from './Confirm'
import GithubCorner from 'react-github-corner'
import Log from './Log'
import PropTypes from 'prop-types'
import Score from './Score'
import SettingModal from './SettingModal'
import { connect } from 'react-redux'

class Game extends Component {
  handleChange = event => {
    this.setState({ hint: event.target.checked })
  }

  handleResetHuman = () => {
    this.props.reset(null)
  }

  handleOpenSetting = () => {
    this.setState({
      settingOpen: true
    })
  }

  handleCloseSetting = () => {
    this.setState({
      settingOpen: false
    })
  }

  handleAllowRetract = event => {
    const { setRetractStep, ai } = this.props
    if (event.target.checked) {
      if (ai) {
        setRetractStep(3)
      } else {
        setRetractStep(6)
      }
    } else {
      setRetractStep(0)
    }
  }

  handleVersionChange = event => {
    const { setVersion } = this.props
    setVersion(event.target.value)
  }

  resetState = () => {
    this.props.setState(IDLE)
  }

  render () {
    const { message, reboot, allowRetract, restoreStep } = this.props
    const { hint, settingOpen } = this.state
    return (
      <>
        <div className='container is-fluid'>
          <div className='columns'>
            <div className='column is-6 is-offset-2'>
              <nav className='navbar'>
                <div className='navbar-brand'>
                  <div className='navbar-item'>
                    <p className='title is-3'>Reversi</p>
                  </div>
                </div>
                <div className='navbar-item navbar-end'>
                  <div className='field is-grouped'>
                    <p className='control'>
                      <button
                        className='button is-rounded'
                        onClick={this.handleResetHuman}
                      >
                        <span className='icon'>
                          <i className='fas fa-user-friends' />
                        </span>
                        <span>Play with friend</span>
                      </button>
                      <button className='button is-rounded' onClick={reboot}>
                        <span className='icon'>
                          <i className='fas fa-power-off' />
                        </span>
                        <span>Restart</span>
                      </button>
                      <button
                        className='button is-rounded'
                        disabled={!allowRetract}
                        onClick={restoreStep}
                      >
                        <span className='icon'>
                          <i className='fas fa-undo' />
                        </span>
                      </button>
                      <button
                        className='button is-rounded'
                        onClick={this.handleOpenSetting}
                      >
                        <span className='icon'>
                          <i className='fas fa-cog' />
                        </span>
                      </button>
                    </p>
                  </div>
                </div>
              </nav>
              <div className='columns'>
                <div className='column'>
                  <Board hint={hint} />
                  <span className='is-pulled-right'>{message}</span>
                </div>
                <div className='column'>
                  <Score />
                </div>
              </div>
            </div>
            <div className='column is-2 is-hidden-touch'>
              <Log />
            </div>
          </div>
          <Confirm
            open={this.props.showReplay}
            onConfirm={reboot}
            onCancel={this.resetState}
          >
            Play Again?
          </Confirm>
          <SettingModal
            isOpen={settingOpen}
            onClose={this.handleCloseSetting}
            onHintChange={this.handleChange}
            onRetractChange={this.handleAllowRetract}
            onVersionChange={this.handleVersionChange}
          />
        </div>
        <GithubCorner href='https://github.com/DanSnow/react-reversi' />
      </>
    )
  }

  state = {
    hint: false,
    settingOpen: false
  }

  static propTypes = {
    ai: PropTypes.string,
    message: PropTypes.string.isRequired,
    allowRetract: PropTypes.any.isRequired,
    showReplay: PropTypes.any.isRequired,
    reset: PropTypes.func.isRequired,
    reboot: PropTypes.func.isRequired,
    setRetractStep: PropTypes.func.isRequired,
    setState: PropTypes.func.isRequired,
    restoreStep: PropTypes.func.isRequired,
    setVersion: PropTypes.func.isRequired
  }
}

export default connect(
  state => ({
    message: state.message,
    ai: state.ai,
    allowRetract: state.allowRetractStep && state.pastStep.length,
    showReplay: state.state === ENDED && !state.overlay
  }),
  { reset, setVersion, setRetractStep, restoreStep, reboot, setState }
)(Game)
