import { PayloadAction } from '@reduxjs/toolkit'
import { filter, map, max, prop, propEq, reduce } from 'rambda'
import { all, call, delay, Effect, put, select, takeEvery } from 'redux-saga/effects'
import invariant from 'tiny-invariant'

import { BLACK, ENDED, IDLE, PLAYING, REBOOT, RESET, SWITCH_PLAYER, USER_PLACE_CHESS, WHITE } from './consts'
import { judgeScores } from './lib/ai'
import { clearBoardCandidate, placeAndFlip, placeBoardCandidate } from './lib/board'
import { getCandidate, getOpposite, getPlayer, isPlaceable } from './lib/chess-utils'
import { capitalize, sample } from './lib/utils'
import { createScoreSelector } from './selector'
import { gameActions } from './slices/game'
import { uiActions } from './slices/ui'
import { RootState } from './store'
import { Board, Coords } from './types'

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
  const nextBoard = placeAndFlip({ board, row, col, player })
  yield put(gameActions.setBoard(nextBoard as Board))
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
