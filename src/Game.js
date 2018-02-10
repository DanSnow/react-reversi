import {BLACK, WHITE} from './consts'
import React, {Component, Fragment} from 'react'
import {reset, restoreStep, setRetractStep, setVersion} from './actions'

import Board from './Board'
import GithubCorner from 'react-github-corner'
import Log from './Log'
import PropTypes from 'prop-types'
import SettingModal from './SettingModal'
import {connect} from 'react-redux'
import {scoreSelector} from './selector'

class Game extends Component {
  handleChange = event => {
    this.setState({hint: event.target.checked})
  }

  handleResetBlack = () => {
    this.props.reset(WHITE)
  }

  handleResetWhite = () => {
    this.props.reset(BLACK)
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
    const {setRetractStep, ai} = this.props
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
    const {setVersion} = this.props
    setVersion(event.target.value)
  }

  getPlayerType (player) {
    const {ai} = this.props
    return player === ai ? 'ai' : 'human'
  }

  render () {
    const {message, score, allowRetract, restoreStep} = this.props
    const {hint, settingOpen} = this.state
    return (
      <Fragment>
        <div className='container is-fluid'>
          <div className='columns is-desktop'>
            <div className='column is-4'>
              Play as{' '}
              <button
                className='button is-small is-dark'
                onClick={this.handleResetBlack}>
                black
              </button>
              or
              <button
                className='button is-small is-light'
                onClick={this.handleResetWhite}>
                white
              </button>
              or
              <button
                className='button is-small'
                onClick={this.handleResetHuman}>
                Play with human
              </button>
            </div>
            <div className='column is-2'>
              <button
                className='button is-small'
                onClick={this.handleOpenSetting}>
                Setting
              </button>
            </div>
            <div className='column is-1'>
              <button
                className='button is-small'
                disabled={!allowRetract}
                onClick={restoreStep}>
                Retract
              </button>
            </div>
            <div className='column is-4'>
              <span>{message}</span>
            </div>
          </div>
          <div className='columns'>
            <div className='column is-6'>
              <Board hint={hint} />
            </div>
            <div className='column is-2 is-hidden-touch'>
              <div> Score: </div>
              <div>
                {' '}
                black({this.getPlayerType(BLACK)}): {score.black}{' '}
              </div>
              <div>
                {' '}
                white({this.getPlayerType(WHITE)}): {score.white}
              </div>
              <div> {VERSION} </div>
            </div>
            <div className='column is-4 is-hidden-touch'>
              <Log />
            </div>
          </div>
          <SettingModal
            isOpen={settingOpen}
            onClose={this.handleCloseSetting}
            onHintChange={this.handleChange}
            onRetractChange={this.handleAllowRetract}
            onVersionChange={this.handleVersionChange}
          />
        </div>
        <GithubCorner href='https://github.com/DanSnow/react-reversi' />
      </Fragment>
    )
  }

  state = {
    hint: false,
    settingOpen: false
  }

  static propTypes = {
    ai: PropTypes.string,
    message: PropTypes.string.isRequired,
    allowRetract: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    setRetractStep: PropTypes.func.isRequired,
    restoreStep: PropTypes.func.isRequired,
    score: PropTypes.object.isRequired,
    setVersion: PropTypes.func.isRequired
  }
}

export default connect(
  state => ({
    message: state.message,
    score: scoreSelector(state),
    ai: state.ai,
    allowRetract: state.allowRetractStep && state.pastStep.length
  }),
  {reset, setVersion, setRetractStep, restoreStep}
)(Game)
