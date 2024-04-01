import { isObject } from './is'

export function omit<
  T extends object,
  K extends keyof T,
>(object: T, keys: K[]): Omit<T, K> {
  if (isObject(object)) {
    return Object.fromEntries(
      Object
        .entries(object)
        .filter(([key]) => !keys.includes(key as K)),
    ) as Omit<T, K>
  }

  return object
}
