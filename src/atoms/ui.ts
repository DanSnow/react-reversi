import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { withMutative } from 'jotai-mutative'
import type { History } from '~/store'

export const historyAtom = withMutative(
  atomWithStorage<History>('react-reversi-history', {
    draw: 0,
    lose: 0,
    win: 0,
  }),
)

export const overlayAtom = atom('')
