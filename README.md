# ucv - utility class variant

[![NPM version](https://img.shields.io/npm/v/@claxjs/ucv?color=90D26D&labelColor=18181B&label=npm)](https://www.npmjs.com/package/@claxjs/ucv)
[![NPM downloads](https://img.shields.io/npm/dw/@claxjs/ucv?color=90D26D&labelColor=18181B&label=downloads)](https://www.npmjs.com/package/@claxjs/ucv)
[![LICENSE](https://img.shields.io/github/license/claxjs/ucv?style=flat&labelColor=18181B&color=90D26D&label=license)](https://www.npmjs.com/package/@claxjs/ucv)

> 工具类(utility classes) 和 属性(props) 的最佳拍档

## 🚀 功能

- 插槽分片
- 定制变量
- 组合变量
- 类型提示
- 不限框架

## 📂 目录

- 💬 [社区](#discussions)
- 📦 [安装](#installation)
- 🎯 [使用](#usage)
- 👀 [待办](#todo)
- ❓ [WHY](#why)
- 💜 [致谢](#acknowledgements)
- 😁 [作者](#author)
- ⚖️ [声明](#license)

## <a name="discussions">💬 社区</a>

- QQ 交流群 ([897784703](https://qm.qq.com/q/4c3Sn0R98Y)]

## <a name="installation">📦 开始</a>

```
pnpm install @claxjs/ucv
```

## <a name="usage">🎯 使用</a>

文档已经完成了90%的内容，就等待网站上线了 💜

### Slices(分片)

``` javascript
const clax = ucv({
  base: {
    root: 'base-root-style-1',
    title: 'base-title-style-1'
  }
})

const { root, title } = clax()

/**
 * root() => 'base-root-style-1'
 * title() => 'base-title-style-1'
 */
```

### Vars(变量)

``` javascript
const clax = ucv({
  base: {
    root: 'base-root-style-1',
  },
  vars: {
    color: {
      primary: {
        root: 'vars-color-primary-root-style-1'
      },
    },
    disabled: {
      true: {
        root: 'vars-disabled-true-root-style-1'
      }
    }
  }
})

const { root } = clax({ color: 'primary', disabled: true })
/**
 * root() => 'base-root-style-1 vars-color-primary-root-style-1 vars-disabled-true-root-style-1'
 */
```

### DefaultProps(默认属性)

``` javascript
const clax = ucv({
  base: {
    root: 'base-root-style-1',
  },
  vars: {
    color: {
      primary: {
        root: 'vars-color-primary-root-style-1',
      },
    },
    disabled: {
      true: {
        root: 'vars-disabled-true-root-style-1',
      },
    },
  },
  defaultProps: {
    color: 'primary',
    disabled: true,
  },
})

const { root } = clax()
/**
 * root() => 'base-root-style-1 vars-color-primary-root-style-1 vars-disabled-true-root-style-1'
 */
```

### CombosVars(组合变量)

``` javascript
const clax = ucv({
  base: {
    root: 'base-root-style-1',
    title: 'base-title-style-1',
  },
  vars: {
    color: {
      primary: {
        root: 'vars-color-primary-root-style-1',
      },
      secondary: {
        root: 'vars-color-secondary-root-style-1',
        title: 'vars-color-secondary-title-style-1',
      },
    },
    disabled: {
      true: {
        root: 'vars-disabled-true-root-style-1',
      },
      false: {
        root: 'vars-disabled-false-root-style-1',
        title: 'vars-disabled-false-title-style-1',
      },
    },
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
    disabled: true,
  },
})

const { root } = clax()
const { title } = clax({ color: 'secondary', disabled: false })

/**
 * root() => 'base-root-style-1 vars-color-primary-root-style-1 vars-disabled-true-root-style-1 combos-vars-color-primary-disabled-true-root-style-1'
 *
 * root({ color: 'primary', disabled: false }) => 'base-root-style-1 vars-color-primary-root-style-1 vars-disabled-false-root-style-1 combos-vars-color-primary-disabled-false-root-style-1'
 *
 * title() => 'base-title-style-1 vars-color-secondary-title-style-1 vars-disabled-false-title-style-1'
 */
```

## <a name="todo">👀 待办</a>

- [ ] 添加插槽语法糖
- [ ] 解决工具类冲突

## <a name="why">❓ WHY</a>

`ucv` 主要提供一个 插槽分片 和 组合变量 功能，解决封装组件上难以控制的一些痛点

若用不到以上功能，那么我们建议直接使用 `cva` 即可

## <a name="acknowledgements">💜 致谢</a>

`ucv` 站在巨人肩膀上，由以下项目获取灵感

- [cva](https://github.com/joe-bell/cva)

## <a name="author">😁 作者</a>

- sKy ([@Skiyee](https://github.com/skiyee))

## <a name="license">⚖️ 声明</a>

采用 [GPL-3.0](./LICENSE) 许可协议
