import React, { PropTypes, Component } from 'react';

export default class BoardColumn extends Component {
  render() {
    const { col } = this.props
    return (
      <line stroke='black' strockWidth='1px' x1={ col * 80 } x2={ col * 80 } y1='0' y2='640' />
    )
  }

  static propTypes = {
    col: PropTypes.number.isRequired
  }
}
