import { takeEvery, delay } from 'redux-saga'
import { put, spawn, select, call } from 'redux-saga/effects'
import some from 'lodash/some'
import sum from 'lodash/sum'
import orderBy from 'lodash/orderBy'
import head from 'lodash/head'
import filter from 'lodash/filter'
import sample from 'lodash/sample'
import {
  resetBoard,
  placeChess,
  addSwitch,
  resetSwitch,
  flipAllChess,
  setScore,
  setMessage,
  setPlayer,
  setAi,
  setCandidate,
  placeCandidate,
  clearCandidate
} from './actions'
import {
  USER_PLACE_CHESS,
  FLIP_ALL_CHESS,
  PLACE_CANDIDATE,
  CLEAR_CANDIDATE,
  SWITCH_PLAYER,
  RESET,
  WHITE_CANDIDATE,
  BLACK_CANDIDATE,
  WHITE,
  BLACK
} from './consts'

const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [1, 1],
  [1, -1],
  [-1, 1]
]

export function* reset() {
  yield put(setMessage(''))
  yield put(resetBoard())
  yield put(setAi(WHITE))
  yield put(resetSwitch())
  yield put(setPlayer(BLACK))
  yield put(placeChess(3, 3, BLACK))
  yield put(placeChess(3, 4, WHITE))
  yield put(placeChess(4, 4, BLACK))
  yield put(placeChess(4, 3, WHITE))
  yield put(placeCandidate())
}

function isValidPos(row, col) {
  return row < 8 && row >= 0 && col < 8 && col >= 0
}

function getOpposite(player) {
  return player === WHITE ? BLACK : WHITE
}

function isCandidate(chess) {
  return chess === BLACK_CANDIDATE || chess === WHITE_CANDIDATE
}

function isEmpty(chess) {
  return !chess || isCandidate(chess)
}

function isPlaceable(board, player, row, col) {
  const candiate = getCandidate(player)
  return isValidPos(row, col) && board[row][col] === candiate
}

function getCandidate(player) {
  return player === WHITE ? WHITE_CANDIDATE : BLACK_CANDIDATE;
}

function getPlayer(player) {
  return player === WHITE ? 'white' : 'black'
}

function* switchPlayer() {
  const { player, switchCount, ai } = yield select()
  if (switchCount > 2) {
    yield put(setMessage('Game set'))
    return
  }

  yield put(clearCandidate())

  const nextPlayer = getOpposite(player)
  yield put(setPlayer(nextPlayer))

  yield put(placeCandidate())
  if (!(yield select((state) => state.candiate))) {
    yield put(setMessage(`No move, turn to ${getPlayer(player)}`))
    yield put(addSwitch())
    yield call(switchPlayer)
  } else {
    yield put(setMessage(''))
    yield put(resetSwitch())
    if (nextPlayer === ai) {
      yield call(aiJudgeScore)
      yield call(switchPlayer)
    }
  }
}

function checkFlipChess(board, player, row, col, rd, cd) {
  let count = 0
  let found = false
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

  return (found && count > 0) ? count : 0
}

function* flipChees(board, player, row, col, rd, cd) {
  if (!checkFlipChess(board, player, row, col, rd, cd)) {
    return false
  }

  let r = row + rd
  let c = col + cd

  while (isValidPos(r, c)) {
    if (isEmpty(board[r][c]) || board[r][c] === player) {
      break
    }

    yield put(placeChess(r, c, player))
    r += rd
    c += cd
  }
  return true
}

function* flipAllChessFlow({ payload: { row, col, player } }) {
  const { board } = yield select()
  for (let i = 0; i < 8; i += 1) {
    let [rd, cd] = direction[i];
    yield call(flipChees, board, player, row, col, rd, cd)
  }

}

function* clearCandidateFlow() {
  const board = yield select((state) => state.board)
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      let chess = board[r][c];
      if (isCandidate(chess)) {
        yield put(placeChess(r, c, null))
      }
    }
  }
}

function* placeCandidateFlow() {
  const { player, board } = yield select()
  const chess = getCandidate(player)
  let count = 0
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      let ch = board[r][c];
      if (!ch) {
        for (let i = 0; i < 8; i += 1) {
          let [rd, cd] = direction[i];
          if (checkFlipChess(board, player, r, c, rd, cd)) {
            yield put(placeChess(r, c, chess))
            count += 1
            break
          }
        }
      }
    }
  }
  yield put(setCandidate(count))
}

function judgeScore(board, ai, row, col) {
  const flips = sum(direction.map(([rd, cd]) => checkFlipChess(board, ai, row, col, rd, cd)))
  let posScore = 0
  if ((row === 0 && col === 0) || (row === 7 && col === 7)) { // coner first
    posScore = 200
  } else if (
    ((row === 0 || row === 7) && (col === 1 || col === 6)) ||
    ((row === 1 || row === 6) && (col === 0 || col === 7))
  ) { // Don't place chess around corner
    posScore = -40
  } else if (row === 0 || col === 0 || row === 7 || col === 7) { // Border second
    posScore = 80
  } else if (row === 1 || col === 1 || row === 6 || col === 6) {
    posScore = -20
  } else if (row === 2 || col === 2 || row === 5 || col === 5) {
    posScore = 20
  }
  return flips * 2 + posScore
}

function* aiJudgeScore() {
  const { board, player, ai } = yield select()
  const scores = []
  const chess = getCandidate(player)
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      if (board[r][c] === chess) {
        let score = judgeScore(board, ai, r, c)
        scores.push({
          row: r,
          col: c,
          score: score
        })
      }
    }
  }
  const { score } = head(orderBy(scores, 'score', 'desc'))
  const { row, col } = sample(filter(scores, ['score', score])) // A little random
  yield call(delay, 300) // A little delay
  yield put(flipAllChess({ row, col, player }))
  yield put(placeChess(row, col, player))
}

function* userPlaceChess({ payload: { col, row } }) {
  const { player, board } = yield select()
  if (!isPlaceable(board, player, row, col)) {
    // Not allow place on exist chess or not candiate
    return
  }

  yield put(flipAllChess({ row, col, player }))

  yield put(placeChess(row, col, player))
  yield call(switchPlayer)
}

export function* root() {
  yield [
    takeEvery(RESET, reset),
    takeEvery(USER_PLACE_CHESS, userPlaceChess),
    takeEvery(FLIP_ALL_CHESS, flipAllChessFlow),
    takeEvery(SWITCH_PLAYER, switchPlayer),
    takeEvery(PLACE_CANDIDATE, placeCandidateFlow),
    takeEvery(CLEAR_CANDIDATE, clearCandidateFlow)
  ]
}

export default root
