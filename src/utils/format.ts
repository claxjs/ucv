import { isArray, isDef, isUndef } from './is'

export function toArray<T>(value: T | T[]): T[] {
  if (isUndef(value))
    return []

  return isArray(value) ? value : [value]
}

export function toClax<T>(...value: T[]): string {
  return toArray(value).flat(Number.POSITIVE_INFINITY).filter(Boolean).join(' ')
}

export function toListCombinations<T>(arr: (T | undefined | null)[]): T[][] {
  if (!isArray(arr))
    return [[]]

  return arr.filter(isDef).reduce((acc: T[][], item: T) => {
    const itemArr: T[] = toArray(item)
    return acc.flatMap(accItem => itemArr.map(v => [...accItem, v]))
  }, [[]])
}
