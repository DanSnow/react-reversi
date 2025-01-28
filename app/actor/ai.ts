import type { AIVersions } from '~/store/lib/ai'
import type { Board, Player } from '~/store/types'
import { Effect, pipe } from 'effect'
import { fromPromise } from 'xstate'
import { computeScores } from '~/store/ai'
import { placeAndFlip } from '~/store/lib/board'
import { getBestPoint } from '~/store/lib/chess-utils'

export function createAIActor(aiVersion: AIVersions) {
  return fromPromise<Board.Board, { board: Board.Board; player: Player.Player }>(({ input: { board, player } }) => {
    return pipe(
      Effect.sync(() => {
        const scores = computeScores({ board, ai: player, version: aiVersion })
        return getBestPoint(scores)
      }),
      Effect.delay(300),
      Effect.map(({ row, col }) =>
        placeAndFlip({
          board,
          col,
          row,
          player,
        }),
      ),
      Effect.runPromise,
    )
  })
}
