import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { WHITE } from '~/consts'
import { Log } from '../Log'

describe('log.tsx', (): void => {
  it('render Log', () => {
    render(<Log log={[]} />)

    expect(screen.getByText(/log/i)).toBeDefined()
  })

  it('render chess placement log', () => {
    render(<Log log={[{ type: 'move', player: WHITE, pos: '(3, 5)' }]} />)

    expect(screen.getByText(/\(3, 5\)/)).toBeDefined()
  })
})
