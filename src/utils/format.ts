import { isArray, isUndef } from './is'

export function toArray<T>(value: T | T[]): T[] {
  if (isUndef(value))
    return []

  return isArray(value) ? value : [value]
}

export function toClax<T>(...value: T[]): string {
  return toArray(value).flat(Number.POSITIVE_INFINITY).filter(Boolean).join(' ')
}
