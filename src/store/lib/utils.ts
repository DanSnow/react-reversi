import { head, tail } from 'rambda'

export const capitalize = (s: string): string => `${head(s).toUpperCase()}${tail(s)}`

export function sample<T>(list: readonly T[]): T {
  const n = Math.trunc(Math.random() * list.length)
  return list[n]
}
