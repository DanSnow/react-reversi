import type { AIVersions } from '~/store/lib/ai'
import type { PastState } from '~/types'
import { atom } from 'jotai'
import { withMutative } from 'jotai-mutative'
import { atomWithReset } from 'jotai/utils'

export const aiVersionAtom = atom<AIVersions>('v3Overview')
export const pastStepsAtom = withMutative(atomWithReset<PastState[]>([]))
