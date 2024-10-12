import type { ReadonlyDeep } from 'type-fest'

// import { filter, first,  map, maxBy,  prop, sample } from 'remeda'
import type { Cause } from 'effect'
import type { Board, PointScore } from '../types'
import { Array, Effect, Option, Order, pipe, Random } from 'effect'
import { BLACK, BLACK_CANDIDATE, WHITE, WHITE_CANDIDATE } from '../consts'

export const directions = [
  [-1, 0], // Up
  [1, 0], // Down
  [0, -1], // Left
  [0, 1], // Right
  [-1, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
]

export function isValidPos(row: number, col: number): boolean {
  return row < 8 && row >= 0 && col < 8 && col >= 0
}

export function getOpposite(player: string): string {
  return player === WHITE ? BLACK : WHITE
}

export function isCandidate(chess: string): boolean {
  return chess === BLACK_CANDIDATE || chess === WHITE_CANDIDATE
}

export function isEmpty(chess: string | null): boolean {
  return !chess || isCandidate(chess)
}

export function isPlaceable(board: ReadonlyDeep<Board>, player: string, row: number, col: number): boolean {
  const candidate = getCandidate(player)
  return isValidPos(row, col) && board[row][col] === candidate
}

export function getChess(board: ReadonlyDeep<Board>, row: number, col: number): string | null {
  if (isValidPos(row, col)) {
    return !isEmpty(board[row][col]) && board[row][col]
  }
  return null
}

export function getCandidate(player: string): string {
  return player === WHITE ? WHITE_CANDIDATE : BLACK_CANDIDATE
}

export function getPlayer(player: string): string {
  return player === WHITE ? 'white' : 'black'
}

export function countAroundChess(board: ReadonlyDeep<Board>, row: number, col: number): number {
  return directions.reduce((s, [rd, cd]) => s + Number(!!getChess(board, row + rd, col + cd)), 0)
}

export function getBestPoint(scores: Array.NonEmptyArray<PointScore>, shouldRandom: boolean = true): PointScore {
  const { score } = pipe(scores, Array.max(Order.struct({ score: Order.number })))

  return pipe(
    Effect.succeed(
      pipe(
        scores,
        Array.filter((x) => x.score === score),
      ),
    ),
    // A little random
    Effect.flatMap(
      (scores): Effect.Effect<PointScore, Cause.NoSuchElementException> =>
        shouldRandom ? Random.choice(scores) : Effect.succeed(scores[0]),
    ),
    Effect.option,
    Effect.map((score) => Option.getOrThrow(score)),
    Effect.runSync,
  )
}
