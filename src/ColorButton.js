import React from 'react'
import styled from 'react-emotion'

const SvgText = styled.text({
  fontSize: '2.5em',
  pointerEvents: 'none'
})

export function ColorButton ({
  x,
  y,
  color,
  children,
  background,
  onClick,
  value
}) {
  return (
    <>
      <circle
        fill={background}
        cx={x}
        cy={y}
        r={80}
        onClick={() => onClick(value)}
      />
      <SvgText fill={color} textAnchor='middle' x={x} y={y + 10}>
        {children}
      </SvgText>
    </>
  )
}
