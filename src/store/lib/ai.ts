import { createNextState as produce } from '@reduxjs/toolkit'
import { max, reduce, sum } from 'rambda'
import { ReadonlyDeep } from 'type-fest'

import { Board } from '../types'
import { checkFlipChess, clearBoardCandidate, countPlayerChess, placeAndFlip, placeBoardCandidate } from './board'
import { countAroundChess, directions, getCandidate, getOpposite } from './chess-utils'

function judgeScoreV1(board: ReadonlyDeep<Board>, ai: string, row: number, col: number): number {
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
  const score = sum(flips) * 2 + posScore
  return score
}

function judgeScoreV1PlusOverview(board: ReadonlyDeep<Board>, ai: string, row: number, col: number): number {
  const score = judgeScoreV1(board, ai, row, col)
  return score + boardStatusScore(placeAndFlip({ board, row, col, player: ai }), ai)
}

function judgeScoreV2(board: ReadonlyDeep<Board>, ai: string, row: number, col: number): number {
  const flips = directions.map(([rd, cd]) => checkFlipChess({ board, player: ai, row, col, rd, cd }))
  const posScore = computePosScoreV2(board, row, col)
  const nextBoard = produce(board, (draft: Board) => {
    draft[row][col] = ai
  })
  const willLost = computeWillLost(nextBoard, ai, row, col, posScore)
  const score = sum(flips) * 2 + (willLost ? posScore : Math.abs(posScore) * 2) - willLost
  return score
}

function judgeScoreV2PlusOverview(board: ReadonlyDeep<Board>, ai: string, row: number, col: number): number {
  const score = judgeScoreV2(board, ai, row, col)
  return score + boardStatusScore(placeAndFlip({ board, row, col, player: ai }), ai)
}

function computePosScoreV2(board: readonly (readonly string[])[], row: number, col: number) {
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

function computeWillLost(nextBoard: ReadonlyDeep<Board>, ai: string, row: number, col: number, posScore: number) {
  const willBeFlippedList = directions.map(([rd, cd]) =>
    checkFlipChess({ board: nextBoard, player: getOpposite(ai), row: row - rd, col: col - cd, rd, cd })
  )
  const willBeFlipped = reduce<number, number>(max, 0, willBeFlippedList)
  const willLost =
    willBeFlipped > 0 ? (posScore > 0 ? willBeFlipped * 2 + posScore * 20 : -posScore * 50 + willBeFlipped * 5) : -10000
  return willLost
}

function boardStatusScore(board: ReadonlyDeep<Board>, player: string) {
  let score = 0
  const opposite = getOpposite(player)
  let selfCount = 0
  let oppositeCount = 0
  for (let row = 0; row < board.length; row++) {
    const rowArray = board[row]
    for (let col = 0; col < rowArray.length; col++) {
      if (isCorner(row, col)) {
        if (rowArray[col] === player) {
          score += 100000000
          selfCount += 1
        } else if (rowArray[col] === opposite) {
          score += -400000000
          oppositeCount += 1
        }
      } else if (isBorder(row, col)) {
        if (rowArray[col] === player) {
          score += 1000
          selfCount += 1
        } else if (rowArray[col] === opposite) {
          score += -2000
          oppositeCount += 1
        }
      } else if (rowArray[col] === player) {
        score += 1
        selfCount += 1
      } else if (rowArray[col] === opposite) {
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

function createMinMax(judge: (board: ReadonlyDeep<Board>, player: string, row: number, col: number) => number) {
  function minMax(board: ReadonlyDeep<Board>, ai: string, row: number, col: number): number {
    const opposite = getOpposite(ai)
    const oppositeCandidate = getCandidate(opposite)
    const { board: nextBoard } = placeBoardCandidate({
      board: clearBoardCandidate(placeAndFlip({ board, row, col, player: ai })),
      player: opposite,
    })
    // first case is win, second is opposite can't move
    if (countPlayerChess(nextBoard, opposite) === 0 || countPlayerChess(nextBoard, oppositeCandidate) === 0) {
      return Number.MAX_SAFE_INTEGER
    }
    const oppositeScores = []
    for (let row = 0; row < nextBoard.length; row++) {
      const rowArray = nextBoard[row]
      for (let col = 0; col < rowArray.length; col++) {
        if (rowArray[col] === oppositeCandidate) {
          oppositeScores.push(judge(nextBoard, opposite, row, col))
        }
      }
    }
    return oppositeScores.length === 0 ? Number.MIN_SAFE_INTEGER : -reduce(max, Number.MIN_SAFE_INTEGER, oppositeScores)
  }

  return minMax
}

export const judgeScores = {
  v1: judgeScoreV1,
  v2: judgeScoreV2,
  v3: createMinMax(judgeScoreV2),
  v3Overview: createMinMax(judgeScoreV2PlusOverview),
  v2Overview: judgeScoreV2PlusOverview,
  v1MinMax: createMinMax(judgeScoreV1),
  v1Overview: createMinMax(judgeScoreV1PlusOverview),
}

function isCorner(row: number, col: number) {
  return (row === 0 || row === 7) && (col === 0 || col === 7)
}

function isBorder(row: number, col: number) {
  return row === 0 || col === 0 || row === 7 || col === 7
}
