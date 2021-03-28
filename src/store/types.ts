import { ENDED, IDLE, PLAYING } from './consts'

export type GameState = typeof IDLE | typeof PLAYING | typeof ENDED

export interface Log {
  player: string
  pos: string
}

export interface PastState {
  board: (string | null)[][]
  player: string | null
  log: Log[]
  candiate: number
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

export type Board = (string | null)[][]
