import { Brand, Function, pipe, Schema } from 'effect'
import { BLACK as BLACK_, WHITE as WHITE_ } from '../consts'

export const PlayerTypeId = Symbol.for('@app/Player')

export const PlayerLiteralSchema = Schema.Literal(BLACK_, WHITE_)
export const PlayerSchema = pipe(PlayerLiteralSchema, Schema.brand(PlayerTypeId))

export type PlayerLiterals = typeof PlayerLiteralSchema.Type

export type Player = typeof PlayerSchema.Type

export const isPlayer = Schema.is(PlayerSchema)

export const parse = Schema.decodeUnknownSync(PlayerSchema)

export const refined = Brand.refined<Player>(isPlayer, (unbranded) =>
  Brand.error(`Expected ${unbranded} to be one of [${BLACK_}, ${WHITE_}]`),
)

export const unbrand = Function.unsafeCoerce<Player, PlayerLiterals>

export const BLACK = refined(BLACK_)
export const WHITE = refined(WHITE_)
