import type { ReadonlyDeep } from 'type-fest'
import type { Board } from '../types'
import { Array, Equal, pipe, Predicate } from 'effect'

import { create as produce } from 'mutative'
import { BLACK_CANDIDATE, WHITE_CANDIDATE } from '../consts'
import { directions, getCandidate, isCandidate, isEmpty, isValidPos } from './chess-utils'

interface CheckFlipChess {
  board: ReadonlyDeep<Board>
  player: string
  row: number
  col: number
  rd: number
  cd: number
}

interface FlipChess {
  board: Board
  player: string
  row: number
  col: number
  rd: number
  cd: number
}

export function checkFlipChess({ board, player, row, col, rd, cd }: CheckFlipChess): number {
  let count = 0
  let found = false
  if (!isValidPos(row, col) || !isEmpty(board[row][col])) {
    return 0
  }
  let r = row + rd
  let c = col + cd
  while (isValidPos(r, c)) {
    if (isEmpty(board[r][c]) || board[r][c] === player) {
      found = board[r][c] === player
      break
    }
    count += 1
    r += rd
    c += cd
  }

  return found && count > 0 ? count : 0
}

function flipChess({ board, player, row, col, rd, cd }: FlipChess) {
  if (!checkFlipChess({ board, player, row, col, rd, cd })) {
    return false
  }

  let r = row + rd
  let c = col + cd

  while (isValidPos(r, c)) {
    if (isEmpty(board[r][c]) || board[r][c] === player) {
      break
    }

    board[r][c] = player
    r += rd
    c += cd
  }
  return true
}

interface FlipAllChess {
  board: ReadonlyDeep<Board>
  row: number
  col: number
  player: string
}

export function placeAndFlip({ board, row, col, player }: FlipAllChess): ReadonlyDeep<Board> {
  return produce(board, (draft) => {
    for (let i = 0; i < 8; i += 1) {
      const [rd, cd] = directions[i]
      flipChess({ board: draft, player, row, col, rd, cd })
    }
    draft[row][col] = player
  })
}

export function clearBoardCandidate(board: ReadonlyDeep<Board>): ReadonlyDeep<Board> {
  return produce(board, (draft) => {
    for (let r = 0; r < 8; r += 1) {
      for (let c = 0; c < 8; c += 1) {
        const chess = draft[r][c]
        if (isCandidate(chess)) {
          draft[r][c] = null
        }
      }
    }
  })
}

export function placeBoardCandidate({ board, player }: { board: ReadonlyDeep<Board>; player: string }): {
  count: number
  board: ReadonlyDeep<Board>
} {
  const chess = getCandidate(player)
  let count = 0
  const nextBoard = produce(board, (draft) => {
    for (let r = 0; r < 8; r += 1) {
      for (let c = 0; c < 8; c += 1) {
        const ch = draft[r][c]
        if (!ch) {
          for (let i = 0; i < 8; i += 1) {
            const [rd, cd] = directions[i]
            if (checkFlipChess({ board: draft, player, row: r, col: c, rd, cd })) {
              draft[r][c] = chess
              count += 1
              break
            }
          }
        }
      }
    }
  })
  return { count, board: nextBoard }
}

export function countCandidate(board: ReadonlyDeep<Board>): number {
  return pipe(
    board,
    Array.flatten,
    Array.filter(Predicate.or(Equal.equals(WHITE_CANDIDATE), Equal.equals(BLACK_CANDIDATE))),
    Array.length,
  )
}

export function countPlayerChess(board: ReadonlyDeep<Board>, player: string): number {
  let count = 0
  for (let row = 0; row < board.length; row++) {
    const rowArray = board[row]
    for (let col = 0; col < rowArray.length; col++) {
      if (rowArray[col] === player) {
        count += 1
      }
    }
  }
  return count
}
