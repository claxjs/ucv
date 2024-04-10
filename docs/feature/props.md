# 内部属性(Props)

一个 `ucv` 可以传入一个全局属性，每一个基础单元下都有内部属性

这是一个例子，假设有一 `button` 如下：

```ts
import { ucv } from '@claxjs/ucv'

const button = ucv({
  base: {
    root: 'base-root-style-1',
    title: ['base-title-style-1'],
    content: ['base-content-style-1', ['base-content-style-1']],
  },
})
```

以下是两种用法，结果生成的工具类是一样的

::: code-group

```ts{2-4} [全局属性]
const { root, title, content } = button({
  class: {
    root: 'global-props-root-style-1',
  },
})

root() // 生成 => 'base-root-style-1 global-props-root-style-1'
title() // 生成 => 'base-title-style-1'
content() // 生成 => 'base-content-style-1 base-content-style-1'
```

```ts{4} [单元属性]
const { root, title, content } = button()

root({
  class: 'global-props-root-style-1',
}) // 生成 => 'base-root-style-1 global-props-root-style-1'
title() // 生成 => 'base-title-style-1'
content() // 生成 => 'base-content-style-1 base-content-style-1'
```
:::

全局属性和属性唯一区别是：全局属性的Class属性需要指定单元，而属性不需要
