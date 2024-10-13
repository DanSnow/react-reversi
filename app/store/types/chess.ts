import { Schema } from '@effect/schema'
import { Array, Brand, pipe } from 'effect'
import {
  BLACK as BLACK_,
  BLACK_CANDIDATE as BLACK_CANDIDATE_,
  WHITE as WHITE_,
  WHITE_CANDIDATE as WHITE_CANDIDATE_,
} from '../consts'

export const ChessTypeId = Symbol.for('@app/Chess')

const ChessLiteralSchema = Schema.Literal(BLACK_, WHITE_, BLACK_CANDIDATE_, WHITE_CANDIDATE_)

export const ChessSchema = pipe(ChessLiteralSchema, Schema.brand(ChessTypeId))

export type Chess = typeof ChessSchema.Type

export const isChess = Schema.is(ChessSchema)

export const refined = Brand.refined<Chess>(isChess, (unbranded) =>
  Brand.error(`Expected ${unbranded} to be one of [${pipe(ChessLiteralSchema.literals, Array.join(', '))}]`),
)

export const BLACK = refined(BLACK_)
export const WHITE = refined(WHITE_)

export const BLACK_CANDIDATE = refined(BLACK_CANDIDATE_)
export const WHITE_CANDIDATE = refined(WHITE_CANDIDATE_)

const PlayerChessLiterSchema = Schema.Literal(BLACK_, WHITE_)
const PlayerChessSchema = pipe(PlayerChessLiterSchema, Schema.brand(ChessTypeId))

export const isPlayerChess = Schema.is(PlayerChessSchema)

const CandidateChessLiterSchema = Schema.Literal(BLACK_CANDIDATE_, WHITE_CANDIDATE_)
const CandidateChessSchema = pipe(CandidateChessLiterSchema, Schema.brand(ChessTypeId))

export const isCandidateChess = Schema.is(CandidateChessSchema)
