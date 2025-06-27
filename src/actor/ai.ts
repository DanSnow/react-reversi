import type { AIVersions } from '~/lib/ai/core'
import type { Board, Player, Point } from '~/types'
import { Effect, pipe } from 'effect'
import { fromPromise } from 'xstate'
import { aiComputeScores } from '~/lib/ai'
import { placeAndFlip } from '~/lib/board'
import { getBestPoint } from '~/lib/chess-utils'

export function createAIActor(aiVersion: AIVersions) {
  return fromPromise<{ nextBoard: Board.Board; point: Point }, { board: Board.Board; player: Player.Player }>(
    ({ input: { board, player } }) => {
      return pipe(
        Effect.sync(() => {
          const scores = aiComputeScores({ board, ai: player, version: aiVersion })
          return getBestPoint(scores)
        }),
        Effect.delay(300),
        Effect.map(({ row, col }) => ({
          point: { row, col },
          nextBoard: placeAndFlip({
            board,
            col,
            row,
            player,
          }),
        })),
        Effect.runPromise,
      )
    },
  )
}
