import { describe, expect, it } from 'vitest'

import { BLACK, BLACK_CANDIDATE, WHITE, WHITE_CANDIDATE } from '../consts'
import { computeScore } from '../selector'

describe('selector.ts', () => {
  describe('computeScore', () => {
    it('count white and black chess', () => {
      expect(
        computeScore([
          [BLACK, WHITE],
          [WHITE, BLACK],
        ])
      ).toEqual({ white: 2, black: 2 })
    })

    it('will not affect by candidate place or null', () => {
      expect(
        computeScore([
          [BLACK, WHITE, WHITE_CANDIDATE, BLACK_CANDIDATE],
          [WHITE, BLACK, null, null],
        ])
      ).toEqual({ white: 2, black: 2 })
    })
  })
})
