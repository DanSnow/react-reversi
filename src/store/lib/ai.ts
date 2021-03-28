import { createNextState as produce } from '@reduxjs/toolkit'
import { max, reduce, sum } from 'rambda'
import { ReadonlyDeep } from 'type-fest'

import { Board } from '../types'
import { checkFlipChess, clearBoardCandidate, placeAndFlip, placeBoardCandidate } from './board'
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

function judgeScoreV2(board: ReadonlyDeep<Board>, ai: string, row: number, col: number): number {
  const flips = directions.map(([rd, cd]) => checkFlipChess({ board, player: ai, row, col, rd, cd }))
  const atTopOrBottom = row === 0 || row === 7
  const atLeftOrRight = col === 0 || col === 7
  const around = countAroundChess(board, row, col)
  let posScore = 0
  if ((row === 0 && col === 0) || (row === 7 && col === 7)) {
    // corner first
    posScore = 100000000
  } else if ((atTopOrBottom && (col === 1 || col === 6)) || ((row === 1 || row === 6) && atLeftOrRight)) {
    if (around > 0) {
      // Don't place chess around corner
      posScore = -300
    } else {
      posScore = 15000
    }
  } else if (row === 0 || col === 0 || row === 7 || col === 7) {
    // Border second
    posScore = 1500 + around * 100
  } else if (row === 1 || col === 1 || row === 6 || col === 6) {
    posScore = -200
  } else if (row === 2 || col === 2 || row === 5 || col === 5) {
    posScore = 50
  }
  const nextBoard = produce(board, (draft: Board) => {
    draft[row][col] = ai
  })
  const willBeFlippedList = directions.map(([rd, cd]) =>
    checkFlipChess({ board: nextBoard, player: getOpposite(ai), row: row - rd, col: col - cd, rd, cd })
  )
  const willBeFlipped = reduce<number, number>(max, 0, willBeFlippedList)
  const willLost =
    willBeFlipped > 0 ? (posScore > 0 ? willBeFlipped * 2 + posScore * 20 : -posScore * 50 + willBeFlipped * 5) : -10000
  const score = sum(flips) * 2 + (willLost ? posScore : Math.abs(posScore) * 2) - willLost
  return score
}

function minMax(board: ReadonlyDeep<Board>, ai: string, row: number, col: number): number {
  const opposite = getOpposite(ai)
  const oppositeCandidate = getCandidate(opposite)
  const { board: nextBoard } = placeBoardCandidate({
    board: clearBoardCandidate(placeAndFlip({ board, row, col, player: ai })),
    player: opposite,
  })
  const oppositeScores = []
  for (let row = 0; row < nextBoard.length; row++) {
    const rowArray = nextBoard[row]
    for (let col = 0; col < rowArray.length; col++) {
      if (rowArray[col] === oppositeCandidate) {
        oppositeScores.push(judgeScoreV2(nextBoard, opposite, row, col))
      }
    }
  }
  return -reduce(max, Number.MIN_SAFE_INTEGER, oppositeScores)
}

export const judgeScores = {
  v1: judgeScoreV1,
  v2: judgeScoreV2,
  v3: minMax,
}
