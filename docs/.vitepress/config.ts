import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'

import { qq } from '../public/icon'
import { version } from '../../package.json'
import vite from './vite.config'

const GUIDES: DefaultTheme.NavItemWithLink[] = [
  { text: '简介', link: '/guide/introduction' },
  { text: '开始', link: '/guide/started' },
]

const FEATURE: DefaultTheme.NavItemWithLink[] = [
  { text: 'API 概述', link: '/feature/api' },
  { text: '基础单元(Base)', link: '/feature/base' },
  { text: '属性变量(Vars)', link: '/feature/vars' },
  { text: '默认属性(DefaultProps)', link: '/feature/defaultProps' },
  { text: '组合变量(CombosVars)', link: '/feature/combosVars' },
]

const VERSION: DefaultTheme.NavItemWithLink[] = [
  { text: '发布日志', link: 'https://github.com/claxjs/ucv/releases' },
  { text: '参与贡献', link: 'https://github.com/claxjs/ucv/blob/main/.github/CONTRIBUTING.md' },
]

const INTEGRATION: DefaultTheme.NavItemWithLink[] = [
  { text: 'Uno', link: '/integration/uno' },
  { text: 'Tailwind', link: '/integration/tailwind' },
]

const Nav: DefaultTheme.NavItem[] = [
  { text: '指南', items: GUIDES },
  { text: '功能', items: FEATURE },
  { text: '集成', items: INTEGRATION },
  { text: `v${version}`, items: VERSION },
]

const SidebarGuide: DefaultTheme.SidebarItem[] = [
  { text: '指南', items: GUIDES },
  { text: '功能', items: FEATURE },
]

const SidebarIntegration: DefaultTheme.SidebarItem[] = [
  { text: '集成', items: INTEGRATION },
]

const Sidebar: DefaultTheme.Sidebar = {
  '/guide/': SidebarGuide,
  '/feature/': SidebarGuide,
  '/integration/': SidebarIntegration,
}

export default defineConfig({
  title: 'UCV',
  description: 'utility class variant',

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  themeConfig: {
    logo: '/logo.svg',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            resetButtonTitle: '清除查询',
            noResultsText: '找不到结果',
            backButtonTitle: '返回',
            displayDetails: '显示详情',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },

    },

    nav: Nav,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/claxjs/ucv' },
      { icon: { svg: qq }, link: 'https://qm.qq.com/q/4c3Sn0R98Y' },
    ],

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    outline: {
      label: '页面导航',
    },

    sidebar: Sidebar,

    editLink: {
      pattern: 'https://github.com/claxjs/ucv/edit/main/docs/:path',
      text: '对本页提出修改建议',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    footer: {
      copyright: 'Copyright © 2024-Present sKy(Skiyee)',
      message: 'Released under the GPL-3.0 License.',
    },
  },
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Skiyee' }],
    ['meta', { property: 'og:title', content: 'UCV' }],
    ['meta', { property: 'og:image', content: '/logo.png' }],
    ['meta', { property: 'og:description', content: '工具类(utility classes) 和 属性(props) 的最佳拍档' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],

  vite,
  markdown: {
    codeTransformers: [
      transformerTwoslash(),
    ],
  },
})
