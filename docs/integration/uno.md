# Uno

配合 `UnoCSS` 使用 `ucv`

## 安装

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

## 使用

由于 `uno` 是经过构建工具来提取工具类的，默认只支持 `.jsx`, `.tsx`, `.vue`, `.md`, `.html`, `.svelte`, `.astro`

若你想在 `ts` 或者 `js` 文件中使用 `ucv`，有两种方法，局部或全局设定，选择你觉得舒服的😁

### 局部(😋推荐)

在单个文件中使用 `@unocss-include` 注释，可以让 `uno` 自动识别工具类

在 `当前文件内`，只需要注释一次，任意位置的 `工具类` 都会生效

```ts{3}
// 文件: *.(ts|js|任意类型)

// @unocss-include
export const ButtonClax = ucv({
  base: {
    root: 'bg-primary-500 text-white',
  }
})
```

OK，在你想要的位置添加 `@unocss-include` 注释，然后使用 `ucv` 测试一下吧！

### 全局

如果你觉得手动注释太麻烦，可以通过修改 `uno.config.*` 来让指定文件接受识别

```ts{9,12}
// 文件: uno.config.*

export default defineConfig({
  content: {
    pipeline: {
      include: [
        // 这一行必须填入！
        // PS: 我不太能理解为什么要这么设计，与默认值合并不是更好的做法？
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,

        // 使 src 文件夹下的所有 js | ts 文件都接受识别
        'src/**/*.{js,ts}',
      ],
    },
  },
})
```

现在你可以在任意 `js` 或 `ts` 内使用 `ucv` 了，enjoy 💜
