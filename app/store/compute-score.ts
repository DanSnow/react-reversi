import type { Board } from './types/board'
import type { Score } from './types/game'
import { Array, identity, pipe, Record, Struct } from 'effect'
import { BLACK, WHITE } from './consts'

export const computeScore: (board: Board) => Score = (board: Board): Score =>
  pipe(
    board,
    Array.flatten,
    Array.groupBy(identity),
    Struct.pick(WHITE, BLACK),
    (struct) => ({ [WHITE]: [], [BLACK]: [], ...struct }),
    Record.map(Array.length),
    (record) => ({
      white: record[WHITE],
      black: record[BLACK],
    }),
  )
