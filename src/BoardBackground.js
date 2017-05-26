import React, {Component} from 'react'

class BoardBackground extends Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    return <rect fill='green' width='640' height='640' />
  }
}

export default BoardBackground
