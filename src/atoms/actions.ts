import {
  allowRetractStepsAtom,
  boardAtom,
  candidateAtom,
  gameMessageAtom,
  gameSnapshotAtom,
  logAtom,
  pastStepsAtom,
  playerAtom,
} from './game'
import { store } from './store'

export function saveStep() {
  const snapshot = store.get(gameSnapshotAtom)
  const allowRetractStep = store.get(allowRetractStepsAtom)
  store.set(pastStepsAtom, (pastSteps) => {
    pastSteps.push(snapshot)
    if (pastSteps.length > allowRetractStep) {
      pastSteps.splice(1)
    }
  })
}

export function restoreStep() {
  const pastSteps = store.get(pastStepsAtom)
  const pastSnapshot = pastSteps[0]
  const { board, candidate, log, message, player } = pastSnapshot
  store.set(boardAtom, board)
  store.set(logAtom, log)
  store.set(candidateAtom, candidate)
  store.set(gameMessageAtom, message)
  store.set(playerAtom, player)
  store.set(pastStepsAtom, pastSteps.slice(1))
}
