import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Background } from '../Background'

describe('background.tsx', (): void => {
  it('render a board', (): void => {
    render(
      <svg>
        <Background />
      </svg>,
    )

    // 9 column
    expect(screen.queryAllByTestId('column')).toHaveLength(9)
    // 9 row
    expect(screen.queryAllByTestId('row')).toHaveLength(9)
    // 1 background
    expect(screen.queryAllByTestId('background')).toHaveLength(1)
  })
})
