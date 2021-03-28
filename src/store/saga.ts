import { createNextState as produce, PayloadAction } from '@reduxjs/toolkit'
import { filter, head, map, max, prop, propEq, reduce, sum, tail } from 'rambda'
import { all, call, delay, Effect, put, select, takeEvery } from 'redux-saga/effects'
import invariant from 'tiny-invariant'
import { ReadonlyDeep } from 'type-fest'

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
import { createScoreSelector } from './selector'
import { gameActions } from './slices/game'
import { uiActions } from './slices/ui'
import { RootState } from './store'
import { Board, Coords } from './types'

const capitalize = (s: string) => `${head(s).toUpperCase()}${tail(s)}`

function sample<T>(list: readonly T[]): T {
  const n = Math.trunc(Math.random() * list.length)
  return list[n]
}

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

export function* reboot(): Generator<Effect, void, void> {
  yield put(gameActions.setState(IDLE))
  yield put(uiActions.setOverlay(''))
  yield put(gameActions.setMessage(''))
  yield put(gameActions.clearLog())
  yield put(gameActions.resetBoard())
  yield put(gameActions.setAi(null))
  yield put(gameActions.setPlayer(null))
  yield put(gameActions.resetSwitch())
}

export function* reset({ payload }: PayloadAction<string>): Generator<Effect, void, void> {
  yield call(reboot)
  yield put(gameActions.setAi(payload))
  yield put(gameActions.setPlayer(BLACK))
  yield put(gameActions.placeChess(3, 3, BLACK))
  yield put(gameActions.placeChess(3, 4, WHITE))
  yield put(gameActions.placeChess(4, 4, BLACK))
  yield put(gameActions.placeChess(4, 3, WHITE))
  yield call(placeCandidate)
  yield put(gameActions.setState(PLAYING))
  if (payload === BLACK) {
    yield call(aiJudgeScore)
    yield call(switchPlayer)
  }
}

function isValidPos(row: number, col: number) {
  return row < 8 && row >= 0 && col < 8 && col >= 0
}

function getOpposite(player: string) {
  return player === WHITE ? BLACK : WHITE
}

function isCandidate(chess) {
  return chess === BLACK_CANDIDATE || chess === WHITE_CANDIDATE
}

function isEmpty(chess) {
  return !chess || isCandidate(chess)
}

function isPlaceable(board: (string | null)[][], player: string, row: number, col: number) {
  const candidate = getCandidate(player)
  return isValidPos(row, col) && board[row][col] === candidate
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
  const {
    game: { ai, switchCount, player },
  }: RootState = yield select()
  const score = yield select(scoreSelector)
  if (switchCount > 2) {
    yield put(gameActions.setMessage('Game set'))
    yield put(gameActions.setState(ENDED))
    if (score.black === score.white) {
      yield put(uiActions.setOverlay('Draw'))
      if (ai) {
        yield put(uiActions.incrementHistory('draw'))
      }
      return
    }
    const winner = score.black > score.white ? BLACK : WHITE
    if (ai) {
      if (ai === winner) {
        yield put(uiActions.setOverlay('You Lose'))
        yield put(uiActions.incrementHistory('lose'))
      } else {
        yield put(uiActions.setOverlay('You Win'))
        yield put(uiActions.incrementHistory('win'))
      }
    } else {
      yield put(uiActions.setOverlay(`${capitalize(getPlayer(winner))} Win`))
    }
    return
  }

  yield call(clearCandidate)

  const nextPlayer = getOpposite(player)
  yield put(gameActions.setPlayer(nextPlayer))

  yield call(placeCandidate)
  if (!(yield select((state: RootState) => state.game.candidate))) {
    yield put(gameActions.setMessage(`No move, turn to ${getPlayer(player)}`))
    yield put(gameActions.addSwitch())
    yield call(switchPlayer)
  } else {
    if (switchCount === 0) {
      yield put(gameActions.setMessage(''))
    }
    yield put(gameActions.resetSwitch())
    if (nextPlayer === ai) {
      yield call(aiJudgeScore)
      yield call(switchPlayer)
    }
  }
}

interface FlipChess {
  board: ReadonlyDeep<Board>
  player: string
  row: number
  col: number
  rd: number
  cd: number
}

function checkFlipChess({ board, player, row, col, rd, cd }: FlipChess) {
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

function* flipChess({ board, player, row, col, rd, cd }: FlipChess) {
  if (!checkFlipChess({ board, player, row, col, rd, cd })) {
    return false
  }

  let r = row + rd
  let c = col + cd

  while (isValidPos(r, c)) {
    if (isEmpty(board[r][c]) || board[r][c] === player) {
      break
    }

    yield put(gameActions.placeChess(r, c, player))
    r += rd
    c += cd
  }
  return true
}

function* flipAllChess({ row, col, player }: { row: number; col: number; player: string }) {
  const {
    game: { board },
  }: RootState = yield select()
  for (let i = 0; i < 8; i += 1) {
    const [rd, cd] = directions[i]
    yield* flipChess({ board, player, row, col, rd, cd })
  }
}

function* clearCandidate() {
  const board = yield select((state: RootState) => state.game.board)
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const chess = board[r][c]
      if (isCandidate(chess)) {
        yield put(gameActions.placeChess(r, c, null))
      }
    }
  }
}

function* placeCandidate() {
  const {
    game: { player, board },
  }: RootState = yield select()
  const chess = getCandidate(player)
  let count = 0
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const ch = board[r][c]
      if (!ch) {
        for (let i = 0; i < 8; i += 1) {
          const [rd, cd] = directions[i]
          if (checkFlipChess({ board, player, row: r, col: c, rd, cd })) {
            yield put(gameActions.placeChess(r, c, chess))
            count += 1
            break
          }
        }
      }
    }
  }
  yield put(gameActions.setCandidate(count))
}

function judgeScoreV1(board: ReadonlyDeep<Board>, ai: string, row: number, col: number) {
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

function judgeScoreV2(board: ReadonlyDeep<Board>, ai: string, row: number, col: number) {
  const flips = directions.map(([rd, cd]) => checkFlipChess({ board, player: ai, row, col, rd, cd }))
  const atTopOrBottom = row === 0 || row === 7
  const atLeftOrRight = col === 0 || col === 7
  const around = countAroundChess(board, row, col)
  let posScore = 0
  if ((row === 0 && col === 0) || (row === 7 && col === 7)) {
    // corner first
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

const judgeScores = {
  v1: judgeScoreV1,
  v2: judgeScoreV2,
}

function* aiJudgeScore() {
  const {
    game: { board, player, ai, version },
  }: RootState = yield select()
  const scores: { row: number; col: number; score: number }[] = []
  const judge = judgeScores[version]
  invariant(judge, 'version invalid')
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
  invariant(scores.length, 'Invalid State: no candidates point')
  const score = reduce(max, Number.MIN_SAFE_INTEGER, map(prop('score'), scores))
  const { row, col } = sample(filter<{ row: number; col: number; score: number }>(propEq('score', score), scores)) // A little random
  yield delay(300) // A little delay
  yield put(
    gameActions.pushLog({
      player,
      pos: `(${row}, ${col})`,
    })
  )
  yield call(flipAllChess, { row, col, player })
  yield put(gameActions.placeChess(row, col, player))
}

function* userPlaceChess({ payload: { col, row } }: PayloadAction<Coords>) {
  const {
    game: { player, board },
  } = yield select()
  if (!isPlaceable(board, player, row, col)) {
    // Not allow place on exist chess or not candidate
    return
  }

  yield put(gameActions.saveStep())

  yield put(
    gameActions.pushLog({
      player,
      pos: `(${row}, ${col})`,
    })
  )
  yield call(flipAllChess, { row, col, player })

  yield put(gameActions.placeChess(row, col, player))
  yield call(switchPlayer)
}

export function* root(): Generator<Effect, void, void> {
  yield all([
    takeEvery(REBOOT, reboot),
    takeEvery(RESET, reset),
    takeEvery(USER_PLACE_CHESS, userPlaceChess),
    takeEvery(SWITCH_PLAYER, switchPlayer),
  ])
}
