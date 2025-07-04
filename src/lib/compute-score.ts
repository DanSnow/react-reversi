import type { Score } from '~/types'
import type { Board } from '~/types/board'
import { Array, pipe, Record, Struct } from 'effect'
import { BLACK, WHITE } from '../consts'

export const computeScore: (board: Board) => Score = (board: Board): Score =>
  pipe(
    board,
    Array.flatten,
    Array.groupBy((chess) => chess as string),
    Struct.pick(WHITE, BLACK),
    (struct) => ({ [WHITE]: [], [BLACK]: [], ...struct }),
    Record.map(Array.length),
    (record) => ({
      white: record[WHITE],
      black: record[BLACK],
    }),
  )
