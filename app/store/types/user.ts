import type { Player } from './player'
import { Brand, Effect, Either, Function, Option, pipe, Record, Schema } from 'effect'
import { BLACK, PlayerLiteralSchema, WHITE } from './player'

export enum UserType {
  Human = 'Human',
  AI = 'AI',
}

const UserTypeSchema = Schema.Enums(UserType)

export const UsersTypeId = Symbol.for('@app/Users')

const UsersSchema = pipe(
  Schema.Record({
    key: PlayerLiteralSchema,
    value: UserTypeSchema,
  }),
  Schema.brand(UsersTypeId),
)

export type Users = typeof UsersSchema.Type

export const isUsers = Schema.is(UsersSchema)

const decodeUnknown = Schema.decodeUnknown(UsersSchema)
const decodeUsersEither = Schema.decodeEither(UsersSchema)

export const refined = Brand.refined<Users>(isUsers, (unbranded) =>
  pipe(unbranded, decodeUsersEither, Either.getLeft, Option.getOrThrow, (error) => Brand.error(error.message)),
)

export const DEFAULT_USER = pipe(
  Record.empty(),
  Record.set(BLACK, UserType.Human),
  Record.set(WHITE, UserType.Human),
  decodeUnknown,
  Effect.runSync,
)

function getUserType_(user: Users, player: Player): UserType {
  return pipe(user as Brand.Brand.Unbranded<Users>, Record.get(player), Option.getOrThrow)
}

export const getUserType = Function.dual(2, getUserType_) as {
  (player: Player): (users: Users) => UserType
  (users: Users, player: Player): UserType
}
