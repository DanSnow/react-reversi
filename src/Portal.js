import PropTypes from 'prop-types'
import {PureComponent} from 'react'
import {createPortal} from 'react-dom'

class Portal extends PureComponent {
  render () {
    if (!this.domNode) {
      this.domNode = document.getElementById('dialog-root')
    }
    return createPortal(this.props.children, this.domNode)
  }

  static propTypes = {
    children: PropTypes.node
  }
}

export default Portal
