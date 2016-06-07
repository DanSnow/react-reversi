import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'
import { Grid, Row, Col } from 'react-flexbox-grid'
import GithubCorner from 'react-github-corner'
import { setHint, reset } from './actions'
import { scoreSelector } from './selector'
import Board from './Board'
import Log from './Log'

@connect((state) => ({
  message: state.message,
  score: scoreSelector(state)
}), { setHint, reset })
export default class Game extends Component {
  @bind
  handleChange(event) {
    this.setState({ hint: event.target.checked })
  }

  @bind
  handleReset() {
    this.props.reset()
  }

  render() {
    const { message, score } = this.props
    const { hint } = this.state
    return (
      <Grid>
        <Row start='xs'>
          <Col xs={ 1 }>
            <button onClick={ this.handleReset }> Reset </button>
          </Col>
          <Col xs={ 3 }>
            <input type='checkbox' name='hint' onChange={ this.handleChange } />
            <label htmlFor='hint'> Hint </label>
          </Col>
          <Col xs={ 5 }>
            <span>{ message }</span>
          </Col>
        </Row>
        <Row>
          <Col md={ 7 } xs={ 12 }>
            <Board hint={ hint } />
          </Col>
          <Col md={ 1 } xs={ 0 }>
            <div> Score: </div>
            <div> black { score.black } </div>
            <div> white { score.white }</div>
            <div> { VERSION } </div>
          </Col>
          <Col md={ 4 } xs={ 0 }>
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
    message: PropTypes.string.isRequired,
    reset: PropTypes.func.isRequired,
    score: PropTypes.object.isRequired
  }
}
