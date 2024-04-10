# 组合变量(CombosVars)

用于定义受多个 `Props` 影响的工具类，适用于需要根据多个变量确定样式的情况

## 数据结构

`combosVars` 是一个对象数组，每个对象可以是多个 `变量体(变量名:状态值)` 和一个 `基础单元` 的组合

::: code-group

```ts [类型]
type CombosVarProps<Vars> = {
  [VarKey in keyof Vars]?:
    | keyof Vars[VarKey]
    | keyof Vars[VarKey][]
} & {
  class?: {
    [BaseKey: string]: Clax
  }
}

type OptionsCombosVars = CombosVar[]
```

```ts [示例]
ucv({
  base: {
    妖怪: '',
    耳朵: '',
    // 更多基础单元...
  },
  vars: {
    紧箍咒: {
      紧: {
        妖怪: '来抓我呀！',
      },
      松: {
        妖怪: '这下跑不了了！'
      }
    },
    金箍棒: {
      变大: {
        妖怪: '哪里跑？',
        // 更多受影响基础单元...
      },
      变小: {
        耳朵: '跑这里！',
        // 更多受影响基础单元...
      },
      // 更多变量值...
    },
  // 更多变量...
  },
  combosVars: [ // [!code focus:17]
    {
      紧箍咒: '松',
      金箍棒: '变大',
      class: {
        妖怪: '要被敲灭啦！'
      }
    },
    {
      紧箍咒: '紧',
      金箍棒: ['变大', '变小'],
      class: {
        耳朵: '怎么嗡嗡的',
        妖怪: '你来打我呀！'
      }
    }
  ],
})
```
:::

## 基本用法

一个样式是受多个 `Props` 影响的状态下才生效的，那么就应该使用 `combosVars`

```ts{35-38} twoslash
import { ucv } from '@claxjs/ucv'

const example = ucv({
  base: {
    root: 'base-root-style-1',
    title: ['base-title-style-1'],
    content: ['base-content-style-1', ['base-content-style-1']],
  },
  vars: {
    color: {
      primary: {
        root: 'vars-color-primary-root-style-1',
        title: 'vars-color-primary-title-style-1',
      },
      secondary: {
        root: 'vars-color-secondary-root-style-1',
        content: 'vars-color-secondary-content-style-1',
      },
      success: {
        root: 'vars-color-success-root-style-1',
      },
    },
    disabled: {
      true: {
        root: 'vars-disabled-true-root-style-1',
        content: 'vars-disabled-true-content-style-1'
      },
      false: {
        root: 'vars-disabled-false-root-style-1',
      }
    }
  },
  combosVars: [
    {
      color: 'primary',
      disabled: true,
      class: {
        root: 'combos-vars-color-primary-disabled-true-root-style-1',
      },
    },
    {
      color: ['primary', 'secondary'],
      disabled: false,
      class: {
        root: 'combos-vars-color-primary-disabled-false-root-style-1',
      },
    },
  ],
  defaultProps: {
    color: 'primary',
    disabled: true
  }
})

const { root, title } = example()

const { content } = example({ color: 'secondary', disabled: false })

/**
 * root() 生成
 * base-root-style-1
 * vars-color-primary-root-style-1 vars-disabled-true-root-style-1
 * combos-vars-color-primary-disabled-true-root-style-1
 */
root()

/**
 * title() 生成
 * base-title-style-1
 * vars-color-primary-title-style-1
 */
title()

/**
 * content() 生成
 * base-content-style-1 base-content-style-1
 * vars-color-secondary-content-style-1
 *
 * 解释：
 *   最后一个class默认情况下应该是 vars-disabled-true-content-style-1 对吧？
 *   但现在的默认值已经被全局属性覆盖了
 */
content()
```

## 实战示例
