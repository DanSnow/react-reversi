import type { PayloadAction } from '@reduxjs/toolkit'
import type { Effect } from 'redux-saga/effects'
import type { AIVersions } from './lib/ai'
import type { AIJudgeScore, Coords, PointScore } from './types/game'
import { Array, Number } from 'effect'
import { RESET as ATOM_RESET } from 'jotai/utils'
import { all, call, delay, takeEvery } from 'redux-saga/effects'
import { upperFirst } from 'scule'
import invariant from 'tiny-invariant'
import { saveStep } from '~/atoms/actions'
import {
  aiVersionAtom,
  boardAtom,
  candidateAtom,
  gameMessageAtom,
  gameStateAtom,
  logAtom,
  playerAtom,
  scoreAtom,
  switchCountAtom,
  usersAtom,
} from '~/atoms/game'
import { store } from '~/atoms/store'
import { historyAtom, overlayAtom } from '~/atoms/ui'
import { BLACK, ENDED, IDLE, PLAYING, REBOOT, RESET, SWITCH_PLAYER, USER_PLACE_CHESS, WHITE } from './consts'
import { judgeScores } from './lib/ai'
import { clearBoardCandidate, placeAndFlip, placeBoardCandidate } from './lib/board'
import { getBestPoint, getCandidate, getOpposite, getPlayer, isPlaceable } from './lib/chess-utils'
import { Board, DEFAULT_USER, getUserType, Player, User, UserType } from './types'

export function* reboot(): Generator<Effect, void, void> {
  store.set(gameStateAtom, IDLE)
  store.set(overlayAtom, '')
  store.set(gameMessageAtom, '')
  store.set(logAtom, [])
  store.set(boardAtom, ATOM_RESET)
  store.set(usersAtom, DEFAULT_USER)
  store.set(playerAtom, null)
  store.set(switchCountAtom, 0)
}

export function* reset({ payload }: PayloadAction<string>): Generator<Effect, void, void> {
  yield call(reboot)
  if (payload != null) {
    store.set(
      usersAtom,
      User.refined({
        ...DEFAULT_USER,
        [payload]: UserType.AI,
      }),
    )
  }
  store.set(playerAtom, Player.BLACK)
  store.set(boardAtom, Board.DEFAULT_BOARD)
  yield call(placeCandidate)
  store.set(gameStateAtom, PLAYING)
  if (payload === BLACK) {
    yield call(aiJudgeScore)
    yield call(switchPlayer)
  }
}

function* switchPlayer() {
  const users = store.get(usersAtom)
  const switchCount = store.get(switchCountAtom)
  const player = store.get(playerAtom)
  if (switchCount > 2) {
    yield call(gameSet)
    return
  }

  yield call(clearCandidate)

  invariant(player, 'game is not start')
  const nextPlayer = getOpposite(player)
  store.set(playerAtom, nextPlayer)

  yield call(placeCandidate)
  const candidate: number = store.get(candidateAtom)
  if (candidate === 0) {
    store.set(gameMessageAtom, `No move, turn to ${getPlayer(player)}`)
    store.set(switchCountAtom, Number.increment)
    yield call(switchPlayer)
  } else {
    if (switchCount === 0) {
      store.set(gameMessageAtom, '')
    }
    store.set(switchCountAtom, 0)
    if (getUserType(users, nextPlayer) === UserType.AI) {
      yield call(aiJudgeScore)
      yield call(switchPlayer)
    }
  }
}

function* gameSet() {
  const users = store.get(usersAtom)
  const score = store.get(scoreAtom)
  const bothAI = users[BLACK] === UserType.AI && users[WHITE] === UserType.AI
  const hasAI = users[BLACK] === UserType.AI || users[WHITE] === UserType.AI
  store.set(gameMessageAtom, 'Game set')
  store.set(gameStateAtom, ENDED)
  if (score.black === score.white) {
    store.set(overlayAtom, 'Draw')
    if (hasAI) {
      store.set(historyAtom, (history) => {
        history.draw += 1
      })
    }
    return
  }
  const winner = score.black > score.white ? Player.BLACK : Player.WHITE
  const winnerType = getUserType(users, winner)
  if (hasAI && !bothAI) {
    if (winnerType === UserType.AI) {
      store.set(overlayAtom, 'You Lose')
      store.set(historyAtom, (history) => {
        history.lose += 1
      })
    } else {
      store.set(overlayAtom, 'You Win')
      store.set(historyAtom, (history) => {
        history.win += 1
      })
    }
  } else {
    store.set(overlayAtom, `${upperFirst(getPlayer(winner))} Win`)
  }
}

function* clearCandidate() {
  store.set(boardAtom, (board: Board.Board) => {
    return clearBoardCandidate(board)
  })
}

function* placeCandidate() {
  const player = store.get(playerAtom)
  const board = store.get(boardAtom)
  invariant(player, 'game is not start')
  const { board: nextBoard, count } = placeBoardCandidate({ board, player })
  store.set(boardAtom, nextBoard)
  store.set(candidateAtom, count)
}

function* aiJudgeScore() {
  const board = store.get(boardAtom)
  const player = store.get(playerAtom)
  const version = store.get(aiVersionAtom)
  invariant(player, 'game is not start')
  // this function will call before switch user
  const ai = getOpposite(player)
  const scores = computeScores(board, version, player, ai)
  const { row, col } = getBestPoint(scores)

  yield delay(300) // A little delay, to make computer looks like thinking
  store.set(logAtom, (logs) => {
    logs.push({
      player,
      pos: `(${row}, ${col})`,
    })
  })
  const nextBoard = placeAndFlip({ board, row, col, player })
  store.set(boardAtom, nextBoard)
}

function computeScores(board: Board.Board, version: AIVersions, player: Player.Player, ai: string) {
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
  invariant(Array.isNonEmptyArray(scores), 'Invalid State: no candidates point')
  return scores
}

function* userPlaceChess({ payload: { col, row } }: PayloadAction<Coords>) {
  const player = store.get(playerAtom)
  const board = store.get(boardAtom)
  invariant(player, 'game is not start')
  if (!isPlaceable(board, player, row, col)) {
    // Not allow place on exist chess or not candidate
    return
  }

  saveStep()

  store.set(logAtom, (log) => {
    log.push({
      player,
      pos: `(${row}, ${col})`,
    })
  })

  const nextBoard = placeAndFlip({ board, row, col, player })
  store.set(boardAtom, nextBoard)

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
