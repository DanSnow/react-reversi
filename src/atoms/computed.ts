import { atom } from 'jotai'
import { ENDED } from '~/store'
import { allowRetractStepsAtom, gameStateAtom, pastStepsAtom } from './game'
import { overlayAtom } from './ui'

export const showReplayAtom = atom((get) => get(gameStateAtom) === ENDED && !get(overlayAtom))

export const allowRetractAtom = atom((get) => !!(get(allowRetractStepsAtom) && get(pastStepsAtom).length > 0))
