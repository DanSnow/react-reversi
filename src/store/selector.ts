import type { Selector } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { Board, Score } from './types'
import { createSelector } from '@reduxjs/toolkit'

import { defu } from 'defu'
import { flatten, groupBy, identity, length, mapKeys, mapValues, pick, pipe } from 'remeda'
import { BLACK, WHITE } from './consts'

const renameKeys =
  (keysMap: Record<string, string>) =>
  <T extends Record<string, unknown>>(obj: T) => {
    return mapKeys(obj, (key) => keysMap[key as string] ?? key)
  }

const selectBoard = (state: RootState) => state.game.board
const selectPlayer = (state: RootState) => state.game.player

export const computeScore: (board: Board) => Score = (board: Board): Score =>
  pipe(
    board,
    flatten(),
    groupBy(identity),
    pick([WHITE, BLACK]),
    mapValues(length()),
    renameKeys({ [WHITE]: 'white', [BLACK]: 'black' }),
    (x) => defu(x, { white: 0, black: 0 }),
  )

export const createScoreSelector = (): Selector<RootState, Score> => createSelector([selectBoard], computeScore)

export const startedSelector = createSelector([selectPlayer], (player) => !!player)
