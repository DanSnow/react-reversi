import { createNextState as produce,PayloadAction } from '@reduxjs/toolkit'
import { capitalize, filter, head, max, orderBy, sample, sum } from 'lodash-es'
import { all, call, delay, put, select, takeEvery } from 'redux-saga/effects'
import invariant from 'tiny-invariant'

import {
  addSwitch,
  clearLog,
  incrementHistory,
  placeChess,
  pushLog,
  resetBoard,
  resetSwitch,
  saveStep,
  setAi,
  setCandidate,
  setMessage,
  setOverlay,
  setPlayer,
  setState,
} from './actions'
import {
  BLACK,
  BLACK_CANDIDATE,
  ENDED,
  IDLE,
  PLAYING,
  REBOOT,
  RESET,
  SWITCH_PLAYER,
  USER_PLACE_CHESS,
  WHITE,
  WHITE_CANDIDATE,
} from './consts'
import { Coords } from './reducer'
import { createScoreSelector } from './selector'

const directions = [
  [-1, 0], // Up
  [1, 0], // Down
  [0, -1], // Left
  [0, 1], // Right
  [-1, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
]

export function* reboot() {
  yield put(setState(IDLE))
  yield put(setOverlay(''))
  yield put(setMessage(''))
  yield put(clearLog())
  yield put(resetBoard())
  yield put(setAi(null))
  yield put(setPlayer(null))
  yield put(resetSwitch())
}

export function* reset({ payload }: PayloadAction<string>) {
  yield call(reboot)
  yield put(setAi(payload))
  yield put(setPlayer(BLACK))
  yield put(placeChess(3, 3, BLACK))
  yield put(placeChess(3, 4, WHITE))
  yield put(placeChess(4, 4, BLACK))
  yield put(placeChess(4, 3, WHITE))
  yield call(placeCandidate)
  yield put(setState(PLAYING))
  if (payload === BLACK) {
    yield call(aiJudgeScore)
    yield call(switchPlayer)
  }
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

function getChess(board, row, col) {
  if (isValidPos(row, col)) {
    return !isEmpty(board[row][col]) && board[row][col]
  }
  return null
}

function getCandidate(player) {
  return player === WHITE ? WHITE_CANDIDATE : BLACK_CANDIDATE
}

function getPlayer(player) {
  return player === WHITE ? 'white' : 'black'
}

function countAroundChess(board, row, col) {
  return directions.reduce((s, [rd, cd]) => s + Number(!!getChess(board, row + rd, col + cd)), 0)
}

const scoreSelector = createScoreSelector()

function* switchPlayer() {
  const { player, switchCount, ai } = yield select()
  const score = yield select(scoreSelector)
  if (switchCount > 2) {
    yield put(setMessage('Game set'))
    yield put(setState(ENDED))
    if (score.black === score.white) {
      yield put(setOverlay('Draw'))
      if (ai) {
        yield put(incrementHistory('draw'))
      }
      return
    }
    const winner = score.black > score.white ? BLACK : WHITE
    if (ai) {
      if (ai === winner) {
        yield put(setOverlay('You Lose'))
        yield put(incrementHistory('lose'))
      } else {
        yield put(setOverlay('You Win'))
        yield put(incrementHistory('win'))
      }
    } else {
      yield put(setOverlay(`${capitalize(getPlayer(winner))} Win`))
    }
    return
  }

  yield call(clearCandidate)

  const nextPlayer = getOpposite(player)
  yield put(setPlayer(nextPlayer))

  yield call(placeCandidate)
  if (!(yield select((state) => state.candiate))) {
    yield put(setMessage(`No move, turn to ${getPlayer(player)}`))
    yield put(addSwitch())
    yield call(switchPlayer)
  } else {
    if (switchCount === 0) {
      yield put(setMessage(''))
    }
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

function* flipChess(board, player, row, col, rd, cd) {
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

function* flipAllChess({ row, col, player }) {
  const { board } = yield select()
  for (let i = 0; i < 8; i += 1) {
    const [rd, cd] = directions[i]
    yield call(flipChess, board, player, row, col, rd, cd)
  }
}

function* clearCandidate() {
  const board = yield select((state) => state.board)
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const chess = board[r][c]
      if (isCandidate(chess)) {
        yield put(placeChess(r, c, null))
      }
    }
  }
}

function* placeCandidate() {
  const { player, board } = yield select()
  const chess = getCandidate(player)
  let count = 0
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const ch = board[r][c]
      if (!ch) {
        for (let i = 0; i < 8; i += 1) {
          const [rd, cd] = directions[i]
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

function judgeScoreV1(board, ai, row, col) {
  const flips = directions.map(([rd, cd]) => checkFlipChess(board, ai, row, col, rd, cd))
  const atTopOrBottom = row === 0 || row === 7
  const atLeftOrRight = col === 0 || col === 7
  let posScore = 0
  if ((row === 0 && col === 0) || (row === 7 && col === 7)) {
    // coner first
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

function judgeScoreV2(board, ai, row, col) {
  const flips = directions.map(([rd, cd]) => checkFlipChess(board, ai, row, col, rd, cd))
  const atTopOrBottom = row === 0 || row === 7
  const atLeftOrRight = col === 0 || col === 7
  const around = countAroundChess(board, row, col)
  let posScore = 0
  if ((row === 0 && col === 0) || (row === 7 && col === 7)) {
    // coner first
    posScore = 1000
  } else if ((atTopOrBottom && (col === 1 || col === 6)) || ((row === 1 || row === 6) && atLeftOrRight)) {
    if (around > 0) {
      // Don't place chess around corner
      posScore = -300
    } else {
      posScore = 150
    }
  } else if (row === 0 || col === 0 || row === 7 || col === 7) {
    // Border second
    posScore = 150 + around * 100
  } else if (row === 1 || col === 1 || row === 6 || col === 6) {
    posScore = -200
  } else if (row === 2 || col === 2 || row === 5 || col === 5) {
    posScore = 50
  }
  const nextBoard = produce(board, (draft) => {
    draft[row][col] = ai
  })
  const willBeFlipeds = directions.map(([rd, cd]) =>
    checkFlipChess(nextBoard, getOpposite(ai), row - rd, col - cd, rd, cd)
  )
  const willBeFliped = max(willBeFlipeds)
  const willLost =
    willBeFliped > 0 ? (posScore > 0 ? willBeFliped * 2 + posScore * 20 : -posScore * 50 + willBeFliped * 5) : -10000
  const score = sum(flips) * 2 + (willLost ? posScore : Math.abs(posScore) * 2) - willLost
  return score
}

const judgeScores = {
  v1: judgeScoreV1,
  v2: judgeScoreV2,
}

function* aiJudgeScore() {
  const { board, player, ai, version } = yield select()
  const scores = []
  const judge = judgeScores[version]
  invariant(judge, 'version error')
  const chess = getCandidate(player)
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      if (board[r][c] === chess) {
        const score = judge(board, ai, r, c)
        scores.push({
          row: r,
          col: c,
          score: score,
        })
      }
    }
  }
  invariant(scores.length, 'Invalid State: Candidates not place')
  const { score } = head(orderBy(scores, 'score', 'desc'))
  const { row, col } = sample(filter(scores, ['score', score])) // A little random
  yield delay(300) // A little delay
  yield put(
    pushLog({
      player,
      pos: `(${row}, ${col})`,
    })
  )
  yield call(flipAllChess, { row, col, player })
  yield put(placeChess(row, col, player))
}

function* userPlaceChess({ payload: { col, row } }: PayloadAction<Coords>) {
  const { player, board } = yield select()
  if (!isPlaceable(board, player, row, col)) {
    // Not allow place on exist chess or not candiate
    return
  }

  yield put(saveStep())

  yield put(
    pushLog({
      player,
      pos: `(${row}, ${col})`,
    })
  )
  yield call(flipAllChess, { row, col, player })

  yield put(placeChess(row, col, player))
  yield call(switchPlayer)
}

export function* root() {
  yield all([
    takeEvery(REBOOT, reboot),
    takeEvery(RESET, reset),
    takeEvery(USER_PLACE_CHESS, userPlaceChess),
    takeEvery(SWITCH_PLAYER, switchPlayer),
  ])
}

export default root
