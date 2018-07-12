import PropTypes from 'prop-types'
import React from 'react'

export default function BoardColumn ({col}) {
  return (
    <line
      stroke='black'
      strokeWidth='1px'
      x1={col * 80}
      x2={col * 80}
      y1='0'
      y2='640'
    />
  )
}

BoardColumn.propTypes = {
  col: PropTypes.number.isRequired
}
