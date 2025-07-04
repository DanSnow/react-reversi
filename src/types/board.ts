import type { Chess } from './chess'
import type { Coords } from './game'
import { Array, Brand, Either, Function, Option, pipe, Schema } from 'effect'
import { BLACK, ChessSchema, WHITE } from './chess'

export const BoardTypeId = Symbol.for('@app/Board')

const BoardBaseSchema = pipe(
  Schema.Array(pipe(Schema.Array(Schema.NullOr(ChessSchema)), Schema.itemsCount(8))),
  Schema.itemsCount(8),
)
const BoardSchema = pipe(BoardBaseSchema, Schema.brand(BoardTypeId))

export type Board = typeof BoardSchema.Type

export type MutableBoard = (Chess | null)[][]

export const isBoard = Schema.is(BoardSchema)

const decodeBoardEither = Schema.decodeEither(BoardSchema)

export const refined = Brand.refined<Board>(isBoard, (unbranded) =>
  pipe(unbranded, decodeBoardEither, Either.getLeft, Option.getOrThrow, (error) => Brand.error(error.message)),
)

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

export const EMPTY_BOARD = refined(Array.makeBy(8, () => Array.makeBy(8, Function.constNull)))
