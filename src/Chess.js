import React, { PropTypes, Component } from 'react'
import { bind } from 'decko'
import pure from 'recompose/pure'

class Chess extends Component {
  @bind
  handleClick(event) {
    const { row, col } = this.props
    this.props.onClick(event, row, col)
  }

  render() {
    const { color, row, col, candiate, hint } = this.props
    return (
      <g>
        <rect onClick={ this.handleClick } width='80' height='80' fillOpacity='0' x={ col * 80 } y={ row * 80 } />
        <circle
          style={ styles.passClick }
          fill={ color }
          fillOpacity={ candiate ? (hint ? '0.3' : '0') : '1' }
          cx={ col * 80 + 40 }
          cy={ row * 80 + 40 }
          r={ 30 } />
      </g>
    )
  }

  static propTypes = {
    color: PropTypes.string.isRequired,
    hint: PropTypes.bool.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    candiate: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };
}

const styles = {
  passClick: {
    pointerEvents: 'none'
  }
}

export default pure(Chess)
