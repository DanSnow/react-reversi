import type { AIVersions } from './ai/core'
import type { AIJudgeScore, Board, Player, PointScore } from '~/types'
import { Array } from 'effect'
import invariant from 'tiny-invariant'
import { judgeScores } from './ai/core'
import { getCandidate } from './chess-utils'

export function aiComputeScores({
  board,
  version,
  ai,
}: {
  board: Board.Board
  version: AIVersions
  ai: Player.Player
}) {
  const scores: PointScore[] = []
  const judge: AIJudgeScore = judgeScores[version]
  invariant(judge, 'version invalid')
  const chess = getCandidate(ai)
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      if (board[r][c] === chess) {
        const score = judge(board, ai, r, c)
        scores.push({
          row: r,
          col: c,
          score,
        })
      }
    }
  }
  invariant(Array.isNonEmptyArray(scores), 'Invalid State: no candidates point')
  return scores
}
