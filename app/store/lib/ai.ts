import type { AIJudgeScore, PointScore } from '~/types/game'

import { createNextState as produce } from '@reduxjs/toolkit'
import { Array, Number as Num, Order } from 'effect'
import invariant from 'tiny-invariant'
import { Board, Chess, type Player } from '~/types'
import { checkFlipChess, clearBoardCandidate, countPlayerChess, placeAndFlip, placeBoardCandidate } from './board'
import { countAroundChess, directions, getBestPoint, getCandidate, getOpposite } from './chess-utils'

function judgeScoreV1(board: Board.Board, ai: string, row: number, col: number): number {
  const flips = directions.map(([rd, cd]) => checkFlipChess({ board, player: ai, row, col, rd, cd }))
  const atTopOrBottom = row === 0 || row === 7
  const atLeftOrRight = col === 0 || col === 7
  let posScore = 0
  if ((row === 0 && col === 0) || (row === 7 && col === 7)) {
    // corner first
    posScore = 200
  } else if ((atTopOrBottom && (col === 1 || col === 6)) || ((row === 1 || row === 6) && atLeftOrRight)) {
    posScore = -80
  } else if (row === 0 || col === 0 || row === 7 || col === 7) {
    // Border second
    posScore = 80
  } else if (row === 1 || col === 1 || row === 6 || col === 6) {
    posScore = -20
  } else if (row === 2 || col === 2 || row === 5 || col === 5) {
    posScore = 20
  }
  const score = Num.sumAll(flips) * 2 + posScore
  return score
}

function judgeScoreV1PlusOverview(board: Board.Board, ai: Player.Player, row: number, col: number): number {
  const score = judgeScoreV1(board, ai, row, col)
  return score + computeOverview(board, row, col, ai)
}

function judgeScoreV2(board: Board.Board, ai: Player.Player, row: number, col: number): number {
  const flips = directions.map(([rd, cd]) => checkFlipChess({ board, player: ai, row, col, rd, cd }))
  const posScore = computePosScoreV2(board, row, col)
  const nextBoard = produce(board, (draft) => {
    const aiChess = Chess.refined(ai)
    Board.unsafeSet(draft, { row, col }, aiChess)
  })
  const willLost = computeWillLost(nextBoard, ai, row, col, posScore)
  const score = Num.sumAll(flips) * 2 + (willLost ? posScore : Math.abs(posScore) * 2) - willLost
  return score
}

function judgeScoreV2PlusOverview(board: Board.Board, ai: Player.Player, row: number, col: number): number {
  const score = judgeScoreV2(board, ai, row, col)
  return score + computeOverview(board, row, col, ai)
}

function computeOverview(board: Board.Board, row: number, col: number, ai: Player.Player): number {
  return boardStatusScore(placeAndFlip({ board, row, col, player: ai }), ai)
}

function computePosScoreV2(board: Board.Board, row: number, col: number) {
  const around = countAroundChess(board, row, col)
  const atTopOrBottom = row === 0 || row === 7
  const atLeftOrRight = col === 0 || col === 7
  if (isCorner(row, col)) {
    // corner first
    return 100000000
  } else if ((atTopOrBottom && (col === 1 || col === 6)) || ((row === 1 || row === 6) && atLeftOrRight)) {
    if (around > 0) {
      // Don't place chess around corner
      return -300
    } else {
      return 15000
    }
  } else if (isBorder(row, col)) {
    // Border second
    return 1500 + around * 100
  } else if (row === 1 || col === 1 || row === 6 || col === 6) {
    return -200
  } else if (row === 2 || col === 2 || row === 5 || col === 5) {
    return 50
  }
  return 0
}

function computeWillLost(nextBoard: Board.Board, ai: Player.Player, row: number, col: number, posScore: number) {
  const willBeFlippedList = directions.map(([rd, cd]) =>
    checkFlipChess({ board: nextBoard, player: getOpposite(ai), row: row - rd, col: col - cd, rd, cd }),
  )
  const willBeFlipped = Array.max([0, ...willBeFlippedList], Order.number)
  const willLost =
    willBeFlipped > 0 ? (posScore > 0 ? willBeFlipped * 2 + posScore * 20 : -posScore * 50 + willBeFlipped * 5) : -10000
  return willLost
}

function boardStatusScore(board: Board.Board, player: Player.Player) {
  let score = 0
  const opposite = getOpposite(player)
  const oppositeChess = Chess.refined(opposite)
  const playerChess = Chess.refined(player)
  let selfCount = 0
  let oppositeCount = 0
  for (let row = 0; row < board.length; row++) {
    const rowArray = board[row]
    for (let col = 0; col < rowArray.length; col++) {
      if (isCorner(row, col)) {
        if (rowArray[col] === playerChess) {
          score += 100000000
          selfCount += 1
        } else if (rowArray[col] === oppositeChess) {
          score += -400000000
          oppositeCount += 1
        }
      } else if (isBorder(row, col)) {
        if (rowArray[col] === playerChess) {
          score += 1000
          selfCount += 1
        } else if (rowArray[col] === oppositeChess) {
          score += -6000
          oppositeCount += 1
        }
      } else if (rowArray[col] === playerChess) {
        score += 1
        selfCount += 1
      } else if (rowArray[col] === oppositeChess) {
        score += -2
        oppositeCount += 1
      }
    }
  }
  if (selfCount === 0) {
    return Number.MIN_SAFE_INTEGER
  }
  if (oppositeCount === 0) {
    return Number.MAX_SAFE_INTEGER
  }
  return score
}

function createMinMax(judge: AIJudgeScore): AIJudgeScore {
  return (board: Board.Board, ai: Player.Player, row: number, col: number) => {
    const { score } = computeMinMax(judge, board, ai, row, col)
    return score
  }
}

function computeMinMax(
  judge: AIJudgeScore,
  board: Board.Board,
  ai: Player.Player,
  row: number,
  col: number,
  withOverviewBoost = false,
): { score: number; nextBoard: Board.Board } {
  const opposite = getOpposite(ai)
  const oppositeCandidate = getCandidate(opposite)
  const { board: nextBoard } = placeBoardCandidate({
    board: clearBoardCandidate(placeAndFlip({ board, row, col, player: ai })),
    player: opposite,
  })
  // first case is win, second is opposite can't move
  if (countPlayerChess(nextBoard, opposite) === 0 || countPlayerChess(nextBoard, oppositeCandidate) === 0) {
    return {
      score: Number.MAX_SAFE_INTEGER,
      nextBoard,
    }
  }
  const oppositeScores: PointScore[] = []
  for (let row = 0; row < nextBoard.length; row++) {
    const rowArray = nextBoard[row]
    for (let col = 0; col < rowArray.length; col++) {
      if (rowArray[col] === oppositeCandidate) {
        oppositeScores.push({
          score: judge(nextBoard, ai, row, col) + (withOverviewBoost ? computeOverview(board, row, col, ai) : 0),
          row,
          col,
        })
      }
    }
  }

  if (!Array.isNonEmptyArray(oppositeScores)) {
    return {
      score: Number.MIN_SAFE_INTEGER,
      nextBoard,
    }
  }

  const oppositeBest = getBestPoint(oppositeScores, false)

  return {
    score: -oppositeBest.score,
    nextBoard: clearBoardCandidate(
      placeAndFlip({
        board: nextBoard,
        row: oppositeBest.row,
        col: oppositeBest.col,
        player: getOpposite(ai),
      }),
    ),
  }
}

function createIterateMinMax(judge: AIJudgeScore, time: number) {
  return (board: Board.Board, ai: Player.Player, row: number, col: number) => {
    invariant(time >= 1, 'can not use minmax with time < 1')
    let score: number

    for (let i = 0; i < time; i++) {
      const { score: s, nextBoard } = computeMinMax(judge, board, ai, row, col)
      board = nextBoard
      score = s
    }
    return score!
  }
}

function withOverviewScore(judge: AIJudgeScore): AIJudgeScore {
  return (board, ai, row, col) => judge(board, ai, row, col) + computeOverview(board, row, col, ai)
}

export const judgeScores = {
  v1: judgeScoreV1,
  v2: judgeScoreV2,
  v3: createMinMax(judgeScoreV2),
  v3OverviewBoost: withOverviewScore(createIterateMinMax(withOverviewScore(judgeScoreV2), 1)),
  v3IteratedOverview: withOverviewScore(createIterateMinMax(withOverviewScore(judgeScoreV2), 3)),
  v3OverviewIterated: withOverviewScore(createIterateMinMax(withOverviewScore(judgeScoreV2), 3)),
  v3OverviewLatestIterated: withOverviewScore(createIterateMinMax(judgeScoreV2, 3)),
  v3OverviewLatest: withOverviewScore(createMinMax(judgeScoreV2)),
  v3Overview: createMinMax(judgeScoreV2PlusOverview),
  v2Overview: judgeScoreV2PlusOverview,
  v1MinMax: createMinMax(judgeScoreV1),
  v1Overview: createMinMax(judgeScoreV1PlusOverview),
} as const satisfies Record<string, AIJudgeScore>

export type AIVersions = keyof typeof judgeScores

export const DEFAULT_AI_VERSION: AIVersions = 'v3OverviewIterated'

function isCorner(row: number, col: number) {
  return (row === 0 || row === 7) && (col === 0 || col === 7)
}

function isBorder(row: number, col: number) {
  return row === 0 || col === 0 || row === 7 || col === 7
}
