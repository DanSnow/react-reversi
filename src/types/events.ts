import type { Point } from './game'
import type { Player } from './player'

export type GameEmittedEvents =
  | { type: 'noValidMove'; player: Player }
  | { type: 'placed'; point: Point; player: Player }
  | { type: 'undoOccurred' } // Added undo event for log
