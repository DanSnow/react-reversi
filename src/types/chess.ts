import { Brand, pipe, Schema } from 'effect'
import {
  BLACK as BLACK_,
  BLACK_CANDIDATE as BLACK_CANDIDATE_,
  WHITE as WHITE_,
  WHITE_CANDIDATE as WHITE_CANDIDATE_,
} from '../consts'

export const ChessTypeId = '@app/Chess'

const ChessLiteralSchema = Schema.Literals([BLACK_, WHITE_, BLACK_CANDIDATE_, WHITE_CANDIDATE_])

export const ChessSchema = pipe(ChessLiteralSchema, Schema.brand(ChessTypeId))

export type Chess = typeof ChessSchema.Type

export const isChess = Schema.is(ChessSchema)

export const refined = Brand.make<Chess>(isChess)

export const BLACK = refined(BLACK_)
export const WHITE = refined(WHITE_)

export const BLACK_CANDIDATE = refined(BLACK_CANDIDATE_)
export const WHITE_CANDIDATE = refined(WHITE_CANDIDATE_)

const PlayerChessLiterSchema = Schema.Literals([BLACK_, WHITE_])
const PlayerChessSchema = pipe(PlayerChessLiterSchema, Schema.brand(ChessTypeId))

export const isPlayerChess = Schema.is(PlayerChessSchema)

const CandidateChessLiteralSchema = Schema.Literals([BLACK_CANDIDATE_, WHITE_CANDIDATE_])
const CandidateChessSchema = pipe(CandidateChessLiteralSchema, Schema.brand(ChessTypeId))

export const isCandidateChess = Schema.is(CandidateChessSchema)
