import type { Selector } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'

import { Array, Record, Struct, identity, pipe } from 'effect'
import type { Board, Score } from './types'
import type { RootState } from './store'
import { BLACK, WHITE } from './consts'

const selectBoard = (state: RootState) => state.game.board
const selectPlayer = (state: RootState) => state.game.player

export const computeScore: (board: Board) => Score = (board: Board): Score =>
  pipe(
    board,
    Array.flatten,
    Array.groupBy(identity),
    Struct.pick(WHITE, BLACK),
    (struct) => ({ [WHITE]: [], [BLACK]: [], ...struct }),
    Record.map(Array.length),
    (record) => ({
      white: record[WHITE],
      black: record[BLACK],
    }),
  )

export const createScoreSelector = (): Selector<RootState, Score> => createSelector([selectBoard], computeScore)

export const startedSelector = createSelector([selectPlayer], (player) => !!player)
