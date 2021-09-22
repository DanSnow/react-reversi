import { createSlice, freeze, PayloadAction } from '@reduxjs/toolkit'
import { always, times } from 'rambda'

import { BLACK, ENDED, IDLE, PLAYING, WHITE } from '../consts'
import { judgeScores } from '../lib/ai'
import { AIVersions, Board, GameState, Log, Users, UserType } from '../types'

const initialBoard = freeze(times(() => times(always(null), 8), 8))

interface PastState {
  board: (string | null)[][]
  player: string | null
  log: Log[]
  candidate: number
  message: string
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    state: IDLE as GameState,
    candidate: 0,
    switchCount: 0,
    version: 'v3Overview' as keyof typeof judgeScores,
    users: {
      [BLACK]: UserType.Human,
      [WHITE]: UserType.Human,
    },
    aiVersions: {
      [BLACK]: null,
      [WHITE]: null,
    },
    player: null as string | null,
    board: initialBoard,
    pastStep: [] as PastState[],
    allowRetractStep: 0,

    log: [] as Log[],
    message: '',
  },
  reducers: {
    setBoard(state, { payload }: PayloadAction<Board>) {
      state.board = payload
    },
    resetBoard(state) {
      Object.assign(state, { board: initialBoard, pastStep: [] })
    },
    setPlayer(state, { payload }: PayloadAction<string | null>) {
      state.player = payload
    },
    setUsers(state, { payload }: PayloadAction<Users>) {
      state.users = payload
    },
    setAIVersions(state, { payload }: PayloadAction<AIVersions>) {
      state.aiVersions = payload
    },
    setCandidate(state, { payload }: PayloadAction<number>) {
      state.candidate = payload
    },
    setMessage(state, { payload }: PayloadAction<string>) {
      state.message = payload
    },
    setState(state, { payload }: PayloadAction<typeof IDLE | typeof ENDED | typeof PLAYING>) {
      state.state = payload
    },
    setRetractStep(state, { payload }: PayloadAction<number>) {
      state.allowRetractStep = payload
    },
    setVersion(state, { payload }: PayloadAction<'v1' | 'v2'>) {
      state.version = payload
    },
    addSwitch(state) {
      state.switchCount += 1
    },
    resetSwitch(state) {
      state.switchCount = 0
    },
    pushLog(state, { payload }: PayloadAction<Log>) {
      state.log.push(payload)
    },
    clearLog(state) {
      state.log = []
    },
    saveStep(state) {
      state.pastStep.push({
        board: state.board,
        player: state.player,
        candidate: state.candidate,
        log: state.log,
        message: state.message,
      })

      if (state.pastStep.length > state.allowRetractStep) {
        state.pastStep.splice(1)
      }
    },
    restoreStep(state) {
      Object.assign(state, {
        ...state.pastStep[0],
        pastStep: state.pastStep.slice(1),
      })
    },
  },
})

export const gameActions = gameSlice.actions
