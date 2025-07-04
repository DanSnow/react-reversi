import { describe, expect, it } from 'vitest'

import { BLACK, BLACK_CANDIDATE, WHITE, WHITE_CANDIDATE } from '~/consts'
import { computeScore } from '~/lib/compute-score'

describe('selector.ts', () => {
  describe('computeScore', () => {
    it('count white and black chess', () => {
      expect(
        computeScore([
          [BLACK, WHITE],
          [WHITE, BLACK],
        ] as any),
      ).toEqual({ white: 2, black: 2 })
    })

    it('will not affect by candidate place or null', () => {
      expect(
        computeScore([
          [BLACK, WHITE, WHITE_CANDIDATE, BLACK_CANDIDATE],
          [WHITE, BLACK, null, null],
        ] as any),
      ).toEqual({ white: 2, black: 2 })
    })

    it('will count correctly if one color has no chess', () => {
      expect(
        computeScore([
          [BLACK, WHITE_CANDIDATE, BLACK_CANDIDATE],
          [BLACK, null, null],
        ] as any),
      ).toEqual({ white: 0, black: 2 })
    })
  })
})
