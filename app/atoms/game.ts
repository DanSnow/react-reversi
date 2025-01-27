import type { AIVersions } from '~/store/lib/ai'
import { atom } from 'jotai'
import { withMutative } from 'jotai-mutative'
import { atomWithReset } from 'jotai/utils'
import { computeScore } from '~/store/compute-score'
import { BLACK, IDLE, WHITE } from '~/store/consts'
import { Board, DEFAULT_USER, type GameState, type Log, type PastState, type Player, type Users } from '~/store/types'

export const usersAtom = atom<Users>(DEFAULT_USER)

export const gameStateAtom = atom<GameState>(IDLE)
export const aiVersionAtom = atom<AIVersions>('v3Overview')
export const candidateAtom = atom(0)
export const switchCountAtom = atom(0)
export const aiVersionsAtom = atom({
  [BLACK]: null,
  [WHITE]: null,
})
export const playerAtom = atom<Player.Player | null>(null)
export const boardAtom = withMutative(atomWithReset<Board.Board>(Board.EMPTY_BOARD))
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
