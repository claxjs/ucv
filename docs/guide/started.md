# 开始

渐进式使用预览，解释每一个 API 属性的存在价值([跳到使用预览](#预览))

## 安装

<Badges name="ucv" />

::: code-group

```sh [pnpm]
pnpm add @claxjs/ucv
```

```sh [npm]
npm install @claxjs/ucv
```

```sh [yarn]
yarn add @claxjs/ucv
```

:::

## 集成

- [Uno](../integration/uno.md)
- [Tailwind](../integration/tailwind.md)

## 预览

### Base(基础单元)

假如我们要写一个 `Checkout` 组件，那么我们需要哪些 `样式单元` 呢？

你已经想出来了，可以分为: `root` `box` `icon` `label`，🤓 Do it...

<EgBase />

🤖 Finish！效果请看这里！👆

::: code-group
<!-- @unocss-skip-start -->
```ts [Script]
import { ref } from 'vue'
import { ucv } from '@claxjs/ucv'

const selected = ref(false)

const checkbox = ucv({
  base: {
    root: 'inline-flex items-center gap-x-2 shrink-0',
    box: [
      'relative inline-flex items-center justify-center size-6 overflow-clip',
      'border-2 border-solid border-[--vp-c-text-1] rounded-1.5',
    ],
    icon: '',
    label: 'text-sm',
  },
})

const checkboxClax = checkbox()
```

```vue-html [Template]
<label :class="checkboxClax.root()">
  <span :class="checkboxClax.box()">
    <svg v-if="selected" :class="checkboxClax.icon()" viewBox="0 0 24 24">
      <Icons name="heart" />
    </svg>
  </span>
  <span :class="checkboxClax.label()">现在还点不了！你觉得缺了什么？🤔</span>
</label>
```
<!-- @unocss-skip-end -->
:::

### Vars(属性变量)

书接上文，一个 `Checkout` 必须能 `check` 对吧？😯

此时就需要配合一个 `变量(Vars)` 来控制显隐的 `工具类`，🤓 Do it...

<EgVars />

加一点点动效中... 🤖 Finish！效果请点击这里！👆

::: code-group
<!-- @unocss-skip-start -->
```ts [Script]
import { computed, ref } from 'vue'
import { ucv } from '@claxjs/ucv'

const selected = ref(false)

const checkbox = ucv({
  base: {
    root: 'inline-flex items-center gap-x-2 shrink-0',
    box: [
      'relative inline-flex items-center justify-center size-6 overflow-clip',
      'border-2 border-solid border-[--vp-c-text-1] rounded-1.5',
      'after:(content-[""] absolute inset-0 bg-[--vp-c-brand] rounded-1 transition-all-300)',
    ],
    icon: 'z-1 animate-delay-0.6s animate-heart-beat',
    label: 'text-sm',
  },
  vars: {
    selected: {
      true: {
        box: 'after:(scale-100)',
      },
      false: {
        box: 'after:(opacity-0 scale-50)',
      },
    },
  },
})

const checkboxClax = computed(() => {
  return checkbox({ selected: selected.value })
})
```

```vue-html [Template]
<label :class="checkboxClax.root()" @click="selected = !selected">
  <span :class="checkboxClax.box()">
    <svg v-if="selected" :class="checkboxClax.icon()" viewBox="0 0 24 24">
      <Icons name="heart" />
    </svg>
  </span>
  <span :class="checkboxClax.label()">整点尬的，点一下看看是什么？</span>
</label>
```
<!-- @unocss-skip-end -->
:::

### CombosVars(组合变量)

此时我们想让已经 `checked` 组件显示一个 `删除线` 该怎么办呢？🤔

需满足两个变量 `selected(已选) & enableThrough(允许划线) -> true`

两个方法: 直接通过 `语法` 判断，或转递给 `ucv` 配合 `CombosVars`，我选第二种

<EgCombosVars />

::: code-group
<!-- @unocss-skip-start -->
```ts [Script]
import { computed, ref } from 'vue'
import { ucv } from '@claxjs/ucv'

const selected = ref(false)
const enableThrough = true // 假设允许当checked时有划线

const checkbox = ucv({
  base: {
    root: 'inline-flex items-center gap-x-2 shrink-0',
    box: [
      'relative inline-flex items-center justify-center size-6 overflow-clip',
      'border-2 border-solid border-[--vp-c-text-1] rounded-1.5',
      'after:(content-[""] absolute inset-0 bg-[--vp-c-brand] rounded-1 transition-all-300)',
    ],
    icon: 'z-1 animate-delay-0.6s animate-heart-beat',
    label: 'flex items-center text-sm',
  },
  vars: {
    selected: {
      true: {
        box: 'after:(scale-100)',
      },
      false: {
        box: 'after:(opacity-0 scale-50)',
      },
    },
    enableThrough: {
      true: {
        label: 'relative before:(content-[""] absolute transition-all-300 w-0 h-0.5 bg-[--vp-c-brand])',
      },
    },
  },
  combosVars: [
    {
      selected: true,
      enableThrough: true,
      class: {
        label: 'text-[--vp-c-text-2] before:(w-full)',
      },
    },
  ],
})

const checkboxClax = computed(() => {
  return checkbox({ selected: selected.value, enableThrough })
})
```

```vue-html [Template]
<label :class="checkboxClax.root()" @click="selected = !selected">
  <span :class="checkboxClax.box()">
    <svg v-if="selected" :class="checkboxClax.icon()" viewBox="0 0 24 24">
      <Icons name="heart" />
    </svg>
  </span>
  <span :class="checkboxClax.label()">🐞 点击划掉BUG！</span>
</label>
```
<!-- @unocss-skip-end -->
:::
