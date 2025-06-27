import type { History } from '~/types'
import { withMutative } from 'jotai-mutative'
import { atomWithStorage } from 'jotai/utils'

export const historyAtom = withMutative(
  atomWithStorage<History>('react-reversi-history', {
    draw: 0,
    lose: 0,
    win: 0,
  }),
)
