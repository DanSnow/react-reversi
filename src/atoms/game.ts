import type { AIVersions } from '~/lib/ai/core'
import { atom } from 'jotai'

export const aiVersionAtom = atom<AIVersions>('v3Overview')
export const showHintAtom = atom(false)
export const allowRetractAtom = atom(false)
