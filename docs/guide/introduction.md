# 简介

<br>

<span class="text-[--vp-c-brand-1] text-2xl">ucv</span> <span class="op-60">(utility class variant，即工具类变量)</span> 是工具类(utility classes) 和 属性(props) 的最佳拍档，旨在解决工具类难以跟随属性变换的问题，以及原子化CSS封装组件的痛点。

## 功能

- 基础单元 ([Base](../feature/base.md))
- 属性变量 ([Vars](../feature/vars.md))
- 组合变量 ([CombosVars](../feature/combosVars.md))
- 不限框架 ([Integrations](../integration/uno.md))
- 智能提示 ([AutoComplete](../feature/api.md))

## 社区

- QQ 交流群 ([897784703](https://qm.qq.com/q/4c3Sn0R98Y))

## 作者

- sKy ([@Skiyee](https://github.com/skiyee))

## 致谢

- [**cva**](https://github.com/joe-bell/cva)<br>
  感谢各位创造者和贡献者，让 `ucv` 得以站在巨人肩膀人上获取的灵感

## 待办

- 添加使用语法糖
- 解决工具类冲突

## 为什么

为什么不采用 `cva` 而创建 `ucv` 呢？这是一个好问题！

`cva` 是一个强大的工具，但它只能针对单一基础单元进行变量变换。一旦遇到多个基础单元需要相同控制变量进行变换时，就得创建很多耦合的 `cva`，这会使得代码难以集中管理和维护。

而 `ucv` 主要解决了这个痛点。它提供了一种更加灵活和通用的方法来处理多基础单元情况下的变量变换，使得代码更加模块化和易于维护。

如果没有遇到以上所描述的痛点，那么 `cva` 依旧是一个很好的解决方案。
