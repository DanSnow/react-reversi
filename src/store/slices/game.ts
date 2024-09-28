import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    // state: IDLE as GameState,
    // candidate: 0,
    // switchCount: 0,
    // version: 'v3Overview' as keyof typeof judgeScores,
    // users: {
    //   [BLACK]: UserType.Human,
    //   [WHITE]: UserType.Human,
    // },
    // aiVersions: {
    //   [BLACK]: null,
    //   [WHITE]: null,
    // },
    // player: null as string | null,
    // board: initialBoard,
    // pastStep: [] as PastState[],
    // allowRetractStep: 0,
    // log: [] as Log[],
    // message: '',
  },
  reducers: {
    // restoreStep(state) {
    //   Object.assign(state, {
    //     ...state.pastStep[0],
    //     pastStep: state.pastStep.slice(1),
    //   })
    // },
  },
})

export const gameActions = gameSlice.actions
