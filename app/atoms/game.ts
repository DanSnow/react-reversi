import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import { withMutative } from 'jotai-mutative'
import { atomWithMachine } from 'jotai-xstate'
import { createGameMachine } from '~/machines/game'
import type { Board, GameState, Log, PastState, Users } from '~/store'
import { computeScore } from '~/store/compute-score'
import { BLACK, IDLE, WHITE } from '~/store/consts'
import type { AIVersions } from '~/store/lib/ai'
import { countCandidate } from '~/store/lib/board'
import { DEFAULT_USER, initialBoard } from '../lib/consts'

export const usersAtom = atom<Users>(DEFAULT_USER)
export const gameMachineAtom = atomWithMachine((get) => {
  return createGameMachine(get(usersAtom))
})
export const gameBoardAtom = atom((get) => {
  const { context } = get(gameMachineAtom)
  return { board: context.board, count: countCandidate(context.board) }
})

export const gameStateAtom = atom<GameState>(IDLE)
export const aiVersionAtom = atom<AIVersions>('v3Overview')
export const candidateAtom = atom(0)
export const switchCountAtom = atom(0)
export const aiVersionsAtom = atom({
  [BLACK]: null,
  [WHITE]: null,
})
export const playerAtom = atom<string>()
export const boardAtom = withMutative(atomWithReset<Board>(initialBoard))
export const pastStepsAtom = withMutative(atomWithReset<PastState[]>([]))
export const allowRetractStepsAtom = atom(0)
export const logAtom = withMutative(atomWithReset<Log[]>([]))
export const gameMessageAtom = atom('')

export const scoreAtom = atom((get) => {
  const board = get(boardAtom)
  const score = computeScore(board)
  return score
})
export const gameSnapshotAtom = atom((get): PastState => {
  return {
    board: get(boardAtom),
    player: get(playerAtom),
    candidate: get(candidateAtom),
    log: get(logAtom),
    message: get(gameMessageAtom),
  }
})
