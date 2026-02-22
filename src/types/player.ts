import { Brand, Function, pipe, Schema } from 'effect'
import { BLACK as BLACK_, WHITE as WHITE_ } from '~/consts'

export const PlayerTypeId = '@app/Player'

export const PlayerLiteralSchema = Schema.Literals([BLACK_, WHITE_])
export const PlayerSchema = pipe(PlayerLiteralSchema, Schema.brand(PlayerTypeId))

export type PlayerLiterals = typeof PlayerLiteralSchema.Type

export type Player = typeof PlayerSchema.Type

export const isPlayer = Schema.is(PlayerSchema)

export const parse = Schema.decodeUnknownSync(PlayerSchema)

export const refined = Brand.make<Player>(isPlayer)

export const unbrand = Function.coerceUnsafe<Player, PlayerLiterals>

export const BLACK = refined(BLACK_)
export const WHITE = refined(WHITE_)
