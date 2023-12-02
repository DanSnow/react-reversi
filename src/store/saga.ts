import type { PayloadAction } from '@reduxjs/toolkit'
import type { Effect } from 'redux-saga/effects'
import { all, call, delay, put, select, takeEvery } from 'redux-saga/effects'
import invariant from 'tiny-invariant'
import { upperFirst } from 'scule'
import {
  BLACK,
  DEFAULT_BOARD,
  ENDED,
  IDLE,
  PLAYING,
  REBOOT,
  RESET,
  SWITCH_PLAYER,
  USER_PLACE_CHESS,
  WHITE,
} from './consts'
import { judgeScores } from './lib/ai'
import { clearBoardCandidate, placeAndFlip, placeBoardCandidate } from './lib/board'
import { getBestPoint, getCandidate, getOpposite, getPlayer, isPlaceable } from './lib/chess-utils'
import { createScoreSelector } from './selector'
import { gameActions } from './slices/game'
import { uiActions } from './slices/ui'
import type { RootState } from './store'
import type { AIJudgeScore, Board, Coords, PointScore, Score } from './types'
import { UserType } from './types'

const DEFAULT_USER = { [BLACK]: UserType.Human, [WHITE]: UserType.Human }

export function* reboot(): Generator<Effect, void, void> {
  yield put(gameActions.setState(IDLE))
  yield put(uiActions.setOverlay(''))
  yield put(gameActions.setMessage(''))
  yield put(gameActions.clearLog())
  yield put(gameActions.resetBoard())
  yield put(gameActions.setUsers(DEFAULT_USER))
  yield put(gameActions.setPlayer(null))
  yield put(gameActions.resetSwitch())
}

export function* reset({ payload }: PayloadAction<string>): Generator<Effect, void, void> {
  yield call(reboot)
  if (payload != null) {
    yield put(gameActions.setUsers({ ...DEFAULT_USER, [payload]: UserType.AI }))
  }
  yield put(gameActions.setPlayer(BLACK))
  yield put(gameActions.setBoard(DEFAULT_BOARD as Board))
  yield call(placeCandidate)
  yield put(gameActions.setState(PLAYING))
  if (payload === BLACK) {
    yield call(aiJudgeScore)
    yield call(switchPlayer)
  }
}

const scoreSelector = createScoreSelector()

function* switchPlayer() {
  const {
    game: { users, switchCount, player },
  }: RootState = yield select()
  if (switchCount > 2) {
    yield call(gameSet)
    return
  }

  yield call(clearCandidate)

  const nextPlayer = getOpposite(player)
  yield put(gameActions.setPlayer(nextPlayer))

  yield call(placeCandidate)
  const candidate: number = yield select((state: RootState) => state.game.candidate)
  if (candidate === 0) {
    yield put(gameActions.setMessage(`No move, turn to ${getPlayer(player)}`))
    yield put(gameActions.addSwitch())
    yield call(switchPlayer)
  } else {
    if (switchCount === 0) {
      yield put(gameActions.setMessage(''))
    }
    yield put(gameActions.resetSwitch())
    if (users[nextPlayer] === UserType.AI) {
      yield call(aiJudgeScore)
      yield call(switchPlayer)
    }
  }
}

function* gameSet() {
  const {
    game: { users },
  }: RootState = yield select()
  const score: Score = yield select(scoreSelector)
  const bothAI = users[BLACK] === UserType.AI && users[WHITE] === UserType.AI
  const hasAI = users[BLACK] === UserType.AI || users[WHITE] === UserType.AI
  yield put(gameActions.setMessage('Game set'))
  yield put(gameActions.setState(ENDED))
  if (score.black === score.white) {
    yield put(uiActions.setOverlay('Draw'))
    if (hasAI) {
      yield put(uiActions.incrementHistory('draw'))
    }
    return
  }
  const winner = score.black > score.white ? BLACK : WHITE
  if (hasAI && !bothAI) {
    if (users[winner] === UserType.AI) {
      yield put(uiActions.setOverlay('You Lose'))
      yield put(uiActions.incrementHistory('lose'))
    } else {
      yield put(uiActions.setOverlay('You Win'))
      yield put(uiActions.incrementHistory('win'))
    }
  } else {
    yield put(uiActions.setOverlay(`${upperFirst(getPlayer(winner))} Win`))
  }
}

function* clearCandidate() {
  const board = yield select((state: RootState) => state.game.board)
  const nextBoard = clearBoardCandidate(board)
  yield put(gameActions.setBoard(nextBoard as Board))
}

function* placeCandidate() {
  const {
    game: { player, board },
  }: RootState = yield select()
  const { board: nextBoard, count } = placeBoardCandidate({ board, player })
  yield put(gameActions.setBoard(nextBoard as Board))
  yield put(gameActions.setCandidate(count))
}

function* aiJudgeScore() {
  const {
    game: { board, player, version },
  }: RootState = yield select()
  // this function will call before switch user
  const ai = getOpposite(player)
  const scores: PointScore[] = computeScores(board, version, player, ai)
  const { row, col } = getBestPoint(scores)

  yield delay(300) // A little delay, to make computer looks like thinking
  yield put(
    gameActions.pushLog({
      player,
      pos: `(${row}, ${col})`,
    }),
  )
  const nextBoard = placeAndFlip({ board, row, col, player })
  yield put(gameActions.setBoard(nextBoard as Board))
}

function computeScores(board: Board, version: string, player: string, ai: string) {
  const scores: PointScore[] = []
  const judge: AIJudgeScore = judgeScores[version]
  invariant(judge, 'version invalid')
  const chess = getCandidate(player)
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
  invariant(scores.length, 'Invalid State: no candidates point')
  return scores
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
    }),
  )

  const nextBoard = placeAndFlip({ board, row, col, player })
  yield put(gameActions.setBoard(nextBoard as Board))

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
