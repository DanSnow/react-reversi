import type { History } from '~/types'
import { atom } from 'jotai'
import { withMutative } from 'jotai-mutative'
import { atomWithStorage } from 'jotai/utils'

export const historyAtom = withMutative(
  atomWithStorage<History>('react-reversi-history', {
    draw: 0,
    lose: 0,
    win: 0,
  }),
)

export const overlayAtom = atom('')
