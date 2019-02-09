import React, { useCallback } from 'react'

import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Circle = styled.circle({
  pointerEvents: 'none'
})

function Chess ({ color, row, col, candidate, hint, onClick }) {
  const handleClick = useCallback(
    () => {
      onClick(row, col)
    },
    [row, col]
  )

  return (
    <>
      <rect onClick={handleClick} width='80' height='80' fillOpacity='0' x={col * 80} y={row * 80} />
      <Circle
        fill={color}
        fillOpacity={candidate ? (hint ? '0.3' : '0') : '1'}
        cx={col * 80 + 40}
        cy={row * 80 + 40}
        r={30}
      />
    </>
  )
}

Chess.propTypes = {
  color: PropTypes.string.isRequired,
  hint: PropTypes.bool.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  candidate: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Chess
