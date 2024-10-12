import type { ReadonlyDeep } from 'type-fest'
import type { BLACK, ENDED, IDLE, PLAYING, WHITE } from './consts'
import type { judgeScores } from './lib/ai'

export type GameState = typeof IDLE | typeof PLAYING | typeof ENDED

export interface Log {
  player: string
  pos: string
}

export interface PastState {
  board: (string | null)[][]
  player: string | null
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

export enum UserType {
  Human,
  AI,
}

export interface Users {
  [BLACK]: UserType
  [WHITE]: UserType
}

export type AIVersion = keyof typeof judgeScores

export interface AIVersions {
  [BLACK]: AIVersion | null
  [WHITE]: AIVersion | null
}

export type Board = (string | null)[][]

export type AIJudgeScore = (board: ReadonlyDeep<Board>, ai: string, row: number, col: number) => number

export interface PointScore {
  row: number
  col: number
  score: number
}
