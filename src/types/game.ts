import type { Board } from './board'
import type { Player } from './player'
import type { BLACK, WHITE } from '~/consts'
import type { judgeScores } from '~/lib/ai/core'

export type Log = MoveLog | UndoLog

export interface MoveLog {
  type: 'move'
  player: string
  pos: string
}

export interface UndoLog {
  type: 'undo'
  message: string // e.g., "Undo last turn"
}

export interface PastState {
  board: Board
  player: Player | null
  log: Log[]
  candidate: number
  message: string
}

export interface Coords {
  row: number
  col: number
}

export interface ChessInfo extends Coords {
  chess: string
}

export interface History {
  win: number
  lose: number
  draw: number
}

export interface Score {
  black: number
  white: number
}

export type AIVersion = keyof typeof judgeScores

export interface AIVersions {
  [BLACK]: AIVersion | null
  [WHITE]: AIVersion | null
}

export type AIJudgeScore = (board: Board, ai: Player, row: number, col: number) => number

export interface Point {
  readonly row: number
  readonly col: number
}

export interface PointScore extends Point {
  readonly score: number
}
