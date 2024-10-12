import { describe, expect, it } from 'vitest'

import { computeScore } from '../compute-score'
import { BLACK, BLACK_CANDIDATE, WHITE, WHITE_CANDIDATE } from '../consts'

describe('selector.ts', () => {
  describe('computeScore', () => {
    it('count white and black chess', () => {
      expect(
        computeScore([
          [BLACK, WHITE],
          [WHITE, BLACK],
        ]),
      ).toEqual({ white: 2, black: 2 })
    })

    it('will not affect by candidate place or null', () => {
      expect(
        computeScore([
          [BLACK, WHITE, WHITE_CANDIDATE, BLACK_CANDIDATE],
          [WHITE, BLACK, null, null],
        ]),
      ).toEqual({ white: 2, black: 2 })
    })

    it('will count correctly if one color has no chess', () => {
      expect(
        computeScore([
          [BLACK, WHITE_CANDIDATE, BLACK_CANDIDATE],
          [BLACK, null, null],
        ]),
      ).toEqual({ white: 0, black: 2 })
    })
  })
})
