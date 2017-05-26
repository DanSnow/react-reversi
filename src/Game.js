import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Row, Col} from 'react-flexbox-grid'
import GithubCorner from 'react-github-corner'
import {setHint, reset, setRetractStep, restoreStep} from './actions'
import {scoreSelector} from './selector'
import Board from './Board'
import Log from './Log'
import {BLACK, WHITE} from './consts'

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

  getPlayerType (player) {
    const {ai} = this.props
    return player === ai ? 'ai' : 'human'
  }

  render () {
    const {message, score, allowRetract, restoreStep} = this.props
    const {hint} = this.state
    return (
      <Grid>
        <Row start='xs'>
          <Col xs={3}>
            Play as <button onClick={this.handleResetBlack}> black </button>
            or
            <button onClick={this.handleResetWhite}> white </button>
            or
            <button onClick={this.handleResetHuman}> Play with human </button>
          </Col>
          <Col xs={1}>
            <input type='checkbox' name='hint' onChange={this.handleChange} />
            <label htmlFor='hint'> Hint </label>
          </Col>
          <Col xs={2}>
            <input
              type='checkbox'
              name='retract'
              onChange={this.handleAllowRetract}
            />
            <label htmlFor='retract'> Allow Retract </label>
          </Col>
          <Col xs={1}>
            <button disabled={!allowRetract} onClick={restoreStep}>
              Retract
            </button>
          </Col>
          <Col xs={4}>
            <span>{message}</span>
          </Col>
        </Row>
        <Row>
          <Col md={7} xs={12}>
            <Board hint={hint} />
          </Col>
          <Col md={2} xs={0}>
            <div> Score: </div>
            <div> black({this.getPlayerType(BLACK)}): {score.black} </div>
            <div> white({this.getPlayerType(WHITE)}): {score.white}</div>
            <div> {VERSION} </div>
          </Col>
          <Col md={3} xs={0}>
            <Log />
          </Col>
        </Row>
        <GithubCorner href='https://github.com/DanSnow/react-reversi' />
      </Grid>
    )
  }

  state = {
    hint: false
  }

  static propTypes = {
    ai: PropTypes.string,
    message: PropTypes.string.isRequired,
    allowRetract: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    setRetractStep: PropTypes.func.isRequired,
    restoreStep: PropTypes.func.isRequired,
    score: PropTypes.object.isRequired
  }
}

export default connect(
  state => ({
    message: state.message,
    score: scoreSelector(state),
    ai: state.ai,
    allowRetract: state.allowRetractStep && state.pastStep.length
  }),
  {setHint, reset, setRetractStep, restoreStep}
)(Game)
