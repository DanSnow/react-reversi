import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import styled from '@emotion/styled'

const Circle = styled.circle({
  pointerEvents: 'none'
})

class Chess extends Component {
  handleClick = event => {
    const { row, col } = this.props
    this.props.onClick(event, row, col)
  }

  render () {
    const { color, row, col, candiate, hint } = this.props
    return (
      <Fragment>
        <rect onClick={this.handleClick} width='80' height='80' fillOpacity='0' x={col * 80} y={row * 80} />
        <Circle
          fill={color}
          fillOpacity={candiate ? (hint ? '0.3' : '0') : '1'}
          cx={col * 80 + 40}
          cy={row * 80 + 40}
          r={30}
        />
      </Fragment>
    )
  }

  static propTypes = {
    color: PropTypes.string.isRequired,
    hint: PropTypes.bool.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    candiate: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  }
}

export default pure(Chess)
