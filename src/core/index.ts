import {
  TwoKeyMap,
  isDef,
  isEmptyObject,
  isObject,
  isUndef,
  omit,
  toArray,
  toClax,
  toListCombinations,
} from '../utils'

import type {
  BaseSlot,
  Clax,
  GlobalProps,
  OptionBase,
  OptionVars,
  SlotProps,
  UCVOptions,
  VarProps,
} from '../types'

export function ucv<
  Base extends OptionBase,
  Vars extends OptionVars<Base> | undefined,
>({
  base,
  vars = {},
  combosVars = [],
  defaultProps = {},
}: UCVOptions<Base, Vars>) {
  const globalVarProps = defaultProps
  const globalClassProps: Array<Partial<Base>> = []

  const VarsMap = new TwoKeyMap<string, string, Record<string, Clax | undefined>>()

  combosVars.forEach((comboVars) => {
    const comboVarProps = omit(comboVars, ['class', 'kuClass'])
    const comboClassProps = Object.assign(
      {},
      comboVars.class || {},
      comboVars.kuClass || {},
    )

    const varKeysStr = `${Object.keys(comboVarProps).join('-')}-combos`
    const typeNamesArr = toListCombinations(Object.values(comboVarProps))

    typeNamesArr.forEach((typeNameArr) => {
      const typeNameStr = typeNameArr.join('-')
      VarsMap.set(varKeysStr, typeNameStr, comboClassProps)
    })
  })

  const getVarProps = (props: GlobalProps<Base, Vars> | SlotProps<Vars>) => {
    const varProps = omit(props, ['class', 'kuClass'])

    return Object.assign({}, globalVarProps, varProps)
  }

  // 基于运行时储存，第一次会生成类，1+使用已生成的类
  const getPropClass = (props: SlotProps<Vars>, baseKey: string) => {
    return globalClassProps
      .map<Clax>(classProp => classProp[baseKey] ?? '')
      .concat(toArray(props.class || ''), toArray(props.kuClass || ''))
  }

  const getVarsClass = (varProps: VarProps<Vars>, baseKey: string) => {
    const varsClass: Clax = []

    for (const [varKey, typeName] of Object.entries(varProps)) {
      if (isUndef(typeName))
        break

      const varBaseItem = vars[varKey]?.[String(typeName)]

      if (isUndef(varBaseItem))
        break

      if (isDef(varBaseItem))
        varsClass.push(varBaseItem[baseKey] ?? '')
    }

    return varsClass
  }

  const getCombosClass = (varProps: VarProps<Vars>, baseKey: string) => {
    const combosClass: Clax = []

    const varKeysStr = `${Object.keys(varProps).join('-')}-combos`
    const typeNamesStr = Object.values(varProps).join('-')

    const varBaseItem = VarsMap.get(varKeysStr, typeNamesStr)
    if (isDef(varBaseItem))
      combosClass.push(varBaseItem[baseKey] ?? '')

    return combosClass
  }

  const genBaseSlot = (
    baseKey: string,
    baseClass: Clax,
  ) => {
    // 🚀 Warn: 运行时主要调用体，需要关注性能
    const baseSlot = (slotProps: SlotProps<Vars> = {}) => {
      const varProps = getVarProps(slotProps)

      const propClass = getPropClass(slotProps, baseKey)

      if (!isObject(vars) || isEmptyObject(vars))
        return toClax(baseClass, propClass)

      const varsClass = getVarsClass(varProps, baseKey)
      const combosClass = getCombosClass(varProps, baseKey)

      return toClax(baseClass, varsClass, combosClass, propClass)
    }

    return [baseKey, baseSlot] as const
  }

  return (globalProps: GlobalProps<Base, Vars> = {}) => {
    if (isEmptyObject(base))
      throw new Error(`[🧀]: "uvc()" must be passed a base as its first argument.`)

    Object.assign(globalVarProps, getVarProps(globalProps))

    const globalClassProp = Object.assign(
      {},
      globalProps.class || {},
      globalProps.kuClass || {},
    )

    globalClassProps.push(globalClassProp)

    const slotEntries = Object
      .entries<Clax>(base)
      .map(([baseKey, baseClass]) =>
        genBaseSlot(baseKey, baseClass),
      )

    return Object.fromEntries(slotEntries) as Record<keyof Base, BaseSlot<Vars>>
  }
}
