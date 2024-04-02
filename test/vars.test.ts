import { describe, expect, it } from 'vitest'

import { ucv } from '../src'

// TODO: 对于单一变量希望添加语法糖处理
describe('ucv - Vars With Single Base Slot', () => {
  it('basic usage', () => {
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
    })

    const { root } = clax({ color: 'primary', disabled: true })

    expect(root()).toBe('base-root-style-1 vars-color-primary-root-style-1 vars-disabled-true-root-style-1')
  })

  it('with global props', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
      },
      vars: {
        isBig: {
          true: {
            root: 'vars-isBig-true-root-style-1',
          },
          false: {
            root: 'vars-isBig-false-root-style-1',
          },
        },
        color: {
          red: {
            root: 'vars-color-red-root-style-1',
          },
          blue: {
            root: 'vars-color-blue-root-style-1',
          },
        },
      },
    })
    const { root: root1 } = clax({
      isBig: true,
      color: 'blue',
    })

    const { root: root2 } = clax({
      isBig: true,
    })

    const { root: root3 } = clax({
      class: {
        root: 'global-props-root-style-1',
      },
    })

    expect(root1()).toBe('base-root-style-1 vars-isBig-true-root-style-1 vars-color-blue-root-style-1')
    expect(root2()).toBe('base-root-style-1 vars-isBig-true-root-style-1')
    expect(root3()).toBe('base-root-style-1 global-props-root-style-1')
  })

  it('with slot props', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
      },
      vars: {
        color: {
          primary: {
            root: 'vars-color-primary-root-style-1',
          },
          secondary: {
            root: 'vars-color-secondary-root-style-1',
          },
          success: {
            root: 'vars-color-success-root-style-1',
          },
        },
        size: {
          sm: {
            root: 'vars-size-sm-root-style-1',
          },
          md: {
            root: 'vars-size-md-root-style-1',
          },
          lg: {
            root: 'vars-size-lg-root-style-1',
          },
        },
      },
    })

    const { root } = clax()

    expect(root()).toBe('base-root-style-1')
    expect(root({ color: 'primary' })).toBe('base-root-style-1 vars-color-primary-root-style-1')
    expect(root({ color: 'primary', size: 'sm' })).toBe('base-root-style-1 vars-color-primary-root-style-1 vars-size-sm-root-style-1')
    expect(root({ color: 'primary', class: 'slot-props-root-style-1' })).toBe('base-root-style-1 vars-color-primary-root-style-1 slot-props-root-style-1')
  })
})

describe('ucv - Vars With Multiple Base Slot', () => {
  it('with global props', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
        item: 'base-item-style-1',
      },
      vars: {
        isBig: {
          true: {
            item: 'vars-isBig-true-item-style-1',
          },
          false: {
            root: 'vars-isBig-false-item-style-1',
          },
        },
        color: {
          red: {
            root: 'vars-color-red-root-style-1',
          },
          blue: {
            root: 'vars-color-blue-root-style-1',
          },
        },
      },
    })

    const { root, item } = clax({
      isBig: true,
      color: 'red',
      class: {
        root: 'global-props-root-style-1',
      },
    })

    expect(root()).toBe('base-root-style-1 vars-color-red-root-style-1 global-props-root-style-1')
    expect(item()).toBe('base-item-style-1 vars-isBig-true-item-style-1')
  })

  it('with slot props', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
        item: 'base-item-style-1',
      },
      vars: {
        isBig: {
          true: {
            item: 'vars-isBig-true-item-style-1',
          },
          false: {
            root: 'vars-isBig-false-item-style-1',
          },
        },
        color: {
          red: {
            root: 'vars-color-red-root-style-1',
          },
          blue: {
            root: 'vars-color-blue-root-style-1',
          },
        },
      },
    })

    const { root, item } = clax()

    expect(root({})).toBe('base-root-style-1')
    expect(root({ isBig: true, color: 'red' })).toBe('base-root-style-1 vars-color-red-root-style-1')
    expect(root({ isBig: false, color: 'blue' })).toBe('base-root-style-1 vars-isBig-false-item-style-1 vars-color-blue-root-style-1')

    expect(item({ class: 'slot-props-root-style-1' })).toBe('base-item-style-1 slot-props-root-style-1')
    expect(item({ isBig: true, color: 'red' })).toBe('base-item-style-1 vars-isBig-true-item-style-1')
    expect(item({ isBig: false, color: 'blue' })).toBe('base-item-style-1')
  })
})

describe('ucv - Vars with Global props & Slot props', () => {
  it('use global props with single slot', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
      },
      vars: {
        color: {
          primary: {
            root: 'vars-color-primary-root-style-1',
          },
          secondary: {
            root: 'vars-color-secondary-root-style-1',
          },
          success: {
            root: 'vars-color-success-root-style-1',
          },
        },
        size: {
          sm: {
            root: 'vars-size-sm-root-style-1',
          },
          md: {
            root: 'vars-size-md-root-style-1',
          },
          lg: {
            root: 'vars-size-lg-root-style-1',
          },
        },
      },
    })

    const { root } = clax({
      color: 'primary',
      class: {
        root: 'global-props-root-style-1',
      },
    })

    expect(root()).toBe('base-root-style-1 vars-color-primary-root-style-1 global-props-root-style-1')
    expect(root({ size: 'md' })).toBe('base-root-style-1 vars-color-primary-root-style-1 vars-size-md-root-style-1 global-props-root-style-1')
  })

  it('override props', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
      },
      vars: {
        color: {
          primary: {
            root: 'vars-color-primary-root-style-1',
          },
          secondary: {
            root: 'vars-color-secondary-root-style-1',
          },
          success: {
            root: 'vars-color-success-root-style-1',
          },
        },
        size: {
          sm: {
            root: 'vars-size-sm-root-style-1',
          },
          md: {
            root: 'vars-size-md-root-style-1',
          },
          lg: {
            root: 'vars-size-lg-root-style-1',
          },
        },
      },
    })

    const { root } = clax({
      color: 'primary',
      size: 'md',
    })

    expect(root({ color: 'secondary', size: 'sm' })).toBe('base-root-style-1 vars-color-secondary-root-style-1 vars-size-sm-root-style-1')
    expect(root({ color: 'secondary' })).toBe('base-root-style-1 vars-color-secondary-root-style-1 vars-size-md-root-style-1')
  })

  it('merge styles', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
      },
      vars: {
        color: {
          primary: {
            root: 'vars-color-primary-root-style-1',
          },
          secondary: {
            root: 'vars-color-secondary-root-style-1',
          },
          success: {
            root: 'vars-color-success-root-style-1',
          },
        },
        size: {
          sm: {
            root: 'vars-size-sm-root-style-1',
          },
          md: {
            root: 'vars-size-md-root-style-1',
          },
          lg: {
            root: 'vars-size-lg-root-style-1',
          },
        },
      },
    })

    const { root } = clax({
      color: 'primary',
      size: 'md',
      class: {
        root: 'global-props-root-style-1',
      },
    })

    expect(root({ color: 'secondary', size: 'sm' })).toBe('base-root-style-1 vars-color-secondary-root-style-1 vars-size-sm-root-style-1 global-props-root-style-1')
    expect(root({ class: 'slot-props-root-style-1' })).toBe('base-root-style-1 vars-color-primary-root-style-1 vars-size-md-root-style-1 global-props-root-style-1 slot-props-root-style-1')
  })
})
