import type { Chess } from './chess'
import type { Coords } from './game'
import { Array, Brand, Function, pipe, Schema } from 'effect'
import { BLACK, ChessSchema, WHITE } from './chess'

export const BoardTypeId = '@app/Board'

const BoardBaseSchema = Schema.Array(
  pipe(Schema.Array(Schema.NullOr(ChessSchema)).check(Schema.isLengthBetween(8, 8))),
).check(Schema.isLengthBetween(8, 8))
const BoardSchema = pipe(BoardBaseSchema, Schema.brand(BoardTypeId))

export type Board = typeof BoardSchema.Type

export type MutableBoard = (Chess | null)[][]

export const isBoard = Schema.is(BoardSchema)

export const refined = Brand.make<Board>(isBoard)

export function unsafeSet(board_: Board | MutableBoard, { col, row }: Coords, chess: Chess): void {
  const board = board_ as unknown as MutableBoard
  board[row][col] = chess
}

export const DEFAULT_BOARD = refined([
  Array.makeBy(8, Function.constNull),
  Array.makeBy(8, Function.constNull),
  Array.makeBy(8, Function.constNull),
  [null, null, null, BLACK, WHITE, null, null, null],
  [null, null, null, WHITE, BLACK, null, null, null],
  Array.makeBy(8, Function.constNull),
  Array.makeBy(8, Function.constNull),
  Array.makeBy(8, Function.constNull),
])
