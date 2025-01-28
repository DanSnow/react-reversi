import type { Point } from './game'
import type { Player } from './player'

export type GameEmittedEvents = { type: 'noValidMove'; player: Player } | { type: 'placed'; point: Point }
