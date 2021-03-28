import { createSelector, Selector } from '@reduxjs/toolkit'
import { assoc, curry, flatten, groupBy, identity, keys, length, map, pick, pipe, reduce } from 'rambda'

import { BLACK, WHITE } from './consts'
import { RootState } from './store'
import { Board, Score } from './types'

const renameKeys = curry((keysMap, obj) =>
  reduce((acc, key) => assoc(keysMap[key] || key, obj[key], acc), {}, keys(obj))
)

const selectBoard = (state: RootState) => state.game.board
const selectPlayer = (state: RootState) => state.game.player

export const computeScore: (board: Board) => Score = pipe(
  flatten,
  groupBy<string>(identity),
  pick([WHITE, BLACK]),
  map(length),
  renameKeys({ [WHITE]: 'white', [BLACK]: 'black' })
)

export const createScoreSelector = (): Selector<RootState, Score> => createSelector([selectBoard], computeScore)

export const startedSelector = createSelector([selectPlayer], (player) => !!player)
