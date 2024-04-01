export function isUndef(v: unknown): v is undefined | null {
  return v === undefined || v === null
}

export function isDef<T>(v: T): v is NonNullable<T> {
  return !isUndef(v)
}

export function isArray(arg: unknown): arg is any[] {
  return isDef(arg) && Array.isArray(arg)
}

export function isObject(arg: unknown): arg is object {
  return isDef(arg) && typeof arg === 'object' && !isArray(arg)
}

export function isEmptyObject(arg: unknown): arg is object {
  return isObject(arg) && Object.keys(arg).length === 0
}
