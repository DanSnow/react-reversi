import type { Cause } from 'effect'
import type { ReadonlyDeep } from 'type-fest'
import type { Board, PointScore } from '~/types'
import { Array, Effect, Option, Order, pipe, Random } from 'effect'
import { Chess, Player } from '~/types'

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

export function getOpposite(player: Player.Player): Player.Player {
  return player === Player.WHITE ? Player.BLACK : Player.WHITE
}

export function isCandidate(chess: Chess.Chess): boolean {
  return Chess.isCandidateChess(chess)
}

export function isEmpty(chess: Chess.Chess | null): boolean {
  return !chess || isCandidate(chess)
}

function getChess(board: ReadonlyDeep<Board.Board>, row: number, col: number): Chess.Chess | null {
  if (isValidPos(row, col)) {
    if (!isEmpty(board[row][col])) {
      return board[row][col]
    }
  }
  return null
}

export function getCandidate(player: Player.Player): Chess.Chess {
  return player === Player.WHITE ? Chess.WHITE_CANDIDATE : Chess.BLACK_CANDIDATE
}

export function countAroundChess(board: ReadonlyDeep<Board.Board>, row: number, col: number): number {
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
