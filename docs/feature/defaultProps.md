# 默认属性(DefaultProps)

用于定义在没有显式指定 `Props` 的情况下，生成预定义的默认工具类属性。

## 数据结构

`defaultProps` 是一个对象，可由一个或多个 `变量体(变量名:状态值)` 组成

::: code-group

```ts [类型]
type OptionsDefaultProps<Vars> = {
  [VarKey in keyof Vars]?: keyof Vars[VarKey]
}
```

```ts [示例]
ucv({
  base: {
    妖怪: '',
    耳朵: '',
    // 更多基础单元...
  },
  // 不心动tips：不要用中文作为变量名，这里只是为了演示
  vars: {
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
  defaultProps: { // [!code focus:3]
    金箍棒: '变小',
  }
})
```

:::

## 基本用法

若希望在组件未提供相关 `Props` 时生效，可以使用 `defaultProps` 来临时代替并生成默认行为

```ts{32-35} twoslash
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
      },
      success: {
        root: 'vars-color-success-root-style-1',
      },
    },
    disabled: {
      true: {
        root: 'vars-disabled-true-root-style-1',
        content: 'vars-disabled-true-content-style-1',
      },
      false: {
        root: 'vars-disabled-false-root-style-1',
      }
    }
  },
  defaultProps: {
    color: 'primary',
    disabled: true
  }
})

// 以前
/**
 * const { root, title, content } = example({
 *  color: 'primary',
 *  disabled: true
 * })
 */

// 现在
const { root, title, content } = example(/* 对比属性变量这里不需要填写了 */)

/**
 * root() 生成
 * base-root-style-1
 * vars-color-primary-root-style-1 vars-disabled-true-root-style-1
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
 * base-content-style-1 base-content-style-2
 * vars-disabled-true-content-style-1
 */
content()
```

## 实战示例
