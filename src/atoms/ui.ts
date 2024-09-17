import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { withImmer } from 'jotai-immer'
import type { History } from '~/store'

export const historyAtom = withImmer(
  atomWithStorage<History>('react-reversi-history', {
    draw: 0,
    lose: 0,
    win: 0,
  }),
)

export const overlayAtom = atom('')
