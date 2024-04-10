# 基础单元(Base)

用于定义单元样式或根样式，作为整个 `ucv` 的基础单元工具类

## 数据结构

`base` 是一个对象，接受多个基础单元，每一个单元都可接受 `string`、`array<string>`、`嵌套的array<string>`类型

::: code-group

```ts [类型]
interface OptionsBase {
  [BaseKey: string]: Clax
}
```

```ts [示例]
ucv({
  base: { // [!code focus:6]
    baseKey1: 'class-name-1',
    baseKey2: ['class-name-2'],
    baseKey3: ['class-name-3', ['class-name-3']],
    // 更多基础单元...
  }
})
```

:::

## 基本用法

主要用于复杂组件单元化，针对多个基础单元需要相同控制变量变换的场景

```ts{4-8} twoslash
import { ucv } from '@claxjs/ucv'

const example = ucv({
  base: {
    root: 'base-root-style-1',
    title: ['base-title-style-1'],
    content: ['base-content-style-1', ['base-content-style-1']],
  },
})

const { root, title, content } = example()

root() // 生成 => 'base-root-style-1'
title() // 生成 => 'base-title-style-1'
content() // 生成 => 'base-content-style-1 base-content-style-1'
```

## 实战示例

以 `Alert` 组件为例，分为 `root`、 `icon`、 `title`、 `body`、 `content` 五个基础单元

<script setup>
import { ucv } from '../../src'

const alert = ucv({
  base: {
    root: 'flex w-full rounded-lg shadow-sm p-4 bg-blue-50 text-blue-800 dark:(bg-gray-800 text-blue-400)',
    icon: 'flex-shrink-0 mt-1 size-4',
    wrapper: 'ms-3',
    title: 'font-semibold',
    content: 'mt-2 text-sm'
  },
})

const { root, icon, title, wrapper, content } = alert()
</script>

<PreviewBox>
  <div :class="root()">
    <div :class="icon()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg>
    </div>
    <div :class="wrapper()">
      <div :class="title()">Title</div>
      <div :class="content()">Main Content</div>
    </div>
  </div>
</PreviewBox>

::: code-group

```ts [Script] twoslash
import { ucv } from '@claxjs/ucv'

const alert = ucv({
  base: {
    root: 'flex w-full rounded-lg shadow-sm p-4 bg-blue-50 text-blue-800 dark:(bg-gray-800 text-blue-400)',
    icon: 'flex-shrink-0 mt-1 size-4',
    wrapper: 'ms-3',
    title: 'font-semibold',
    content: 'mt-2 text-sm'
  },
})

const { root, icon, wrapper, title, content } = alert()
```

```vue-html [Template]
<div :class="root()">
  <div :class="icon()">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4"></path>
      <path d="M12 8h.01"></path>
    </svg>
  </div>
  <div :class="wrapper()">
    <div :class="title()">Title</div>
    <div :class="content()">Main Content</div>
  </div>
</div>
```

:::
