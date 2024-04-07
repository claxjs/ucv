// 🎈 Basic
export type Clax = string | Clax[]

type StringToBoolean<T> = T extends 'true' ? true : T extends 'false' ? false : T

type ToVarTypeName<T> = StringToBoolean<Exclude<keyof T, symbol>>

// 💎 Options
export interface OptionBase {
  [BaseKey: string]: Clax
}

export interface OptionVars<
  Base extends OptionBase = Record<string, never>,
> {
  [VarKey: string]: {
    [TypeName: string]: Partial<Base>
  }
}

export type VarProps<Vars> = {
  [VarKey in keyof Vars]?: ToVarTypeName<Vars[VarKey]>
}

type CombosVarProps<Vars> = {
  [VarKey in keyof Vars]?:
    | ToVarTypeName<Vars[VarKey]>
    | ToVarTypeName<Vars[VarKey]>[]
}

export interface ClassProps<PropType> {
  class?: PropType
  kuClass?: PropType
}

export type OptionCombosVars<
  Base,
  Vars,
> = Array<CombosVarProps<Vars> & ClassProps<Base>>

export type OptionDefaultProps<Vars> = VarProps<Vars>

export interface UCVOptions<
  Base,
  Vars,
> {
  base: Base
  vars?: Vars
  combosVars?: OptionCombosVars<Base, Vars>
  defaultProps?: OptionDefaultProps<Vars>
}

export type GlobalProps<Base, Vars> =
  | VarProps<Vars> & ClassProps<Partial<Base>>
  | ClassProps<Partial<Base>>

export type UnitProps<Vars> =
  | VarProps<Vars> & ClassProps<Clax>
  | ClassProps<Clax>

export type BaseUnit<Vars> = (unitProps?: UnitProps<Vars>) => string
