import React, { PropTypes, Component } from 'react';

export default class BoardRow extends Component {
  render() {
    const { row } = this.props
    return (
      <line stroke='black' strockWidth='1px' y1={ row * 80 } y2={ row * 80 } x1='0' x2='640' />
    )
  }

  static propTypes = {
    row: PropTypes.number.isRequired
  }
}
