# 属性变量(Vars)

用于定义受 `Props` 影响而变化的变量，允许根据不同的 `Props` 值动态生成样式

## 数据结构

`vars` 是一个对象，可以定义多个 `变量体` (颜色、状态等)，每个 `变量体` 下可定义多个 `状态` (主色|副色、真|假)，每一个 `状态` 下可控制多个[基础单元](./base.md#基本用法)

::: code-group

```ts [类型]
interface OptionsVars {
  [VarKey: string]: {
    [StateName: string]: {
      [BaseKey: string]: Clax
    }
  }
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
  vars: { // [!code focus:14]
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
  }
})
```

:::

## 基本用法

组件内有关样式变化的 `Props` 全用在 `vars` 属性中准没错

```ts{9-31} twoslash
import { ucv } from '@claxjs/ucv'

const example = ucv({
  base: {
    root: 'base-root-style-1',
    title: ['base-title-style-1'],
    content: ['base-content-style-1', ['base-content-style-2']],
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
})

const { root, title, content } = example({
  color: 'primary',
  disabled: true
})

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
