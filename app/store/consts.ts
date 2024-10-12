import { freeze } from '@reduxjs/toolkit'
import { Array } from 'effect'
import { createNull } from './utils'

// Sagas
export const REBOOT = 'REBOOT'
export const RESET = 'RESET'
export const SWITCH_PLAYER = 'SWITCH_PLAYER'
export const USER_PLACE_CHESS = 'USER_PLACE_CHESS'

// Chess
export const WHITE = 'W'
export const BLACK = 'B'
export const WHITE_CANDIDATE = 'WC'
export const BLACK_CANDIDATE = 'BC'

// State
export const IDLE = 'IDLE'
export const PLAYING = 'PLAYING'
export const ENDED = 'ENDED'

export const DEFAULT_BOARD = freeze([
  Array.makeBy(8, createNull),
  Array.makeBy(8, createNull),
  Array.makeBy(8, createNull),
  [null, null, null, BLACK, WHITE, null, null, null],
  [null, null, null, WHITE, BLACK, null, null, null],
  Array.makeBy(8, createNull),
  Array.makeBy(8, createNull),
  Array.makeBy(8, createNull),
])
