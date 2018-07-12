import PropTypes from 'prop-types'
import React from 'react'

export default function BoardRow ({row}) {
  return (
    <line
      stroke='black'
      strokeWidth='1px'
      y1={row * 80}
      y2={row * 80}
      x1='0'
      x2='640'
    />
  )
}

BoardRow.propTypes = {
  row: PropTypes.number.isRequired
}
