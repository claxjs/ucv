# API 概述

`ucv` 可接受该 `Options` 类型的对象，即 `ucv(options)`

```ts
import { ucv } from '@claxjs/ucv'

const example = ucv({ base, vars, combosVars, defaultProps })

const { baseKey1, baseKey2 } = example({ ...globalProp })

const baseKey1Classes = baseKey1({ ...unitProp1 })
const baseKey2Classes = baseKey2({ ...unitProp2 })
```

## 配置

`ucv` 具有类型推导功能，该文档内所展示的类型只是概述，具体类型请看 [类型定义](https://github.com/claxjs/ucv/blob/main/src/types.ts)

### base

定义基础单元工具类

- 类型：`Record<string, Clax>`

- 默认值：必须值，否则报错

- 使用：[基础单元(Base)](./base.md)

### vars

定义受属性影响工具类

- 类型：`Record<string, Record<string, Clax>>`

- 默认值：`{}`

- 使用：[属性变量(Vars)](./vars.md)

### defaultProps

定义默认属性预生成默认工具类

- 类型：`Record<string, string | string[]`

- 默认值：`{}`

- 使用：[默认属性(DefaultProps)](./defaultProps.md)

### combosVars

定义受多重属性影响工具类

- 类型：`Array<Record<string, string | string[] | Record<string, Clax>>>`

- 默认值：`[]`

- 使用：[组合变量(CombosVars)](./combosVars.md)

## 类型

### Clax

```ts
type Clax = string | Clax[]
```
