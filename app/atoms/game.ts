import type { AIVersions } from '~/store/lib/ai'
import { createBrowserInspector } from '@statelyai/inspect'
import { Function } from 'effect'
import { atom } from 'jotai'
import { withMutative } from 'jotai-mutative'
import { atomWithMachine } from 'jotai-xstate'
import { atomWithReset } from 'jotai/utils'
import { createGameMachine } from '~/machines/game'
import { computeScore } from '~/store/compute-score'
import { BLACK, IDLE, WHITE } from '~/store/consts'
import { countCandidate } from '~/store/lib/board'
import { Board, DEFAULT_USER, type GameState, type Log, type PastState, type Player, type Users } from '~/store/types'

const inspect = typeof window !== 'undefined' ? createBrowserInspector().inspect : Function.constVoid

export const usersAtom = atom<Users>(DEFAULT_USER)
export const gameMachineAtom = atomWithMachine(
  (get) => {
    return createGameMachine(get(usersAtom))
  },
  { inspect },
)
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
