import type { ReactElement, ReactNode } from 'react'
import { twc } from 'react-twc'
import { m } from '~/paraglide/messages'
import { Player } from '~/types'

const SvgText = twc.text`pointer-events-none text-4xl`

interface Props<T> {
  x: number
  y: number
  color: string
  children: ReactNode
  background: string
  value: T
  onClick: (val: T) => void
}

export function ColorButton<T>({ x, y, color, children, background, onClick, value }: Props<T>): ReactElement {
  return (
    <g
      role="button"
      className="cursor-pointer"
      aria-description={m.start_as_color({ player: value === Player.BLACK ? m.black() : m.white() })}
      onClick={() => onClick(value)}
    >
      <circle fill={background} cx={x} cy={y} r={80} />
      <SvgText fill={color} textAnchor="middle" x={x} y={y + 10}>
        {children}
      </SvgText>
    </g>
  )
}
