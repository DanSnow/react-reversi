import React, { Fragment, ReactChild } from 'react'

import styled from '@emotion/styled'

const SvgText = styled.text({
  fontSize: '2.5em',
  pointerEvents: 'none'
})

interface Props<T> {
  x: number
  y: number
  color: string
  children: ReactChild
  background: string
  value: T
  onClick: (val: T) => void
}

export function ColorButton<T> ({ x, y, color, children, background, onClick, value }: Props<T>) {
  return (
    <Fragment>
      <circle fill={background} cx={x} cy={y} r={80} onClick={() => onClick(value)} />
      <SvgText fill={color} textAnchor='middle' x={x} y={y + 10}>
        {children}
      </SvgText>
    </Fragment>
  )
}
