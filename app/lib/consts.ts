import { Array, Function } from 'effect'
import { BLACK, WHITE } from '~/store/consts'
import { type Board, UserType } from '~/store/types'

export const initialBoard: Board = Array.makeBy(8, () => Array.makeBy(8, Function.constNull))

export const DEFAULT_USER = { [BLACK]: UserType.Human, [WHITE]: UserType.Human }
