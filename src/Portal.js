import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import { useRef } from 'react'

function Portal ({ target, children }) {
  const domStore = useRef(null)
  if (!domStore.current) {
    domStore.current = document.getElementById(target)
  }
  return createPortal(children, domStore.current)
}

Portal.propTypes = {
  target: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Portal
