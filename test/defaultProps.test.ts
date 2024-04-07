import { describe, expect, it } from 'vitest'

import { ucv } from '../src'

// TODO: 对于单一变量希望添加语法糖处理
describe('ucv - Default Props', () => {
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
      defaultProps: {
        color: 'primary',
        disabled: true,
      },
    })

    const { root } = clax()

    expect(root()).toBe('base-root-style-1 vars-color-primary-root-style-1 vars-disabled-true-root-style-1')
  })

  it('global props override default props', () => {
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
      defaultProps: {
        color: 'primary',
        size: 'sm',
      },
    })

    const { root } = clax({
      color: 'secondary',
    })

    expect(root()).toBe('base-root-style-1 vars-color-secondary-root-style-1 vars-size-sm-root-style-1')
  })

  it('unit props override default props', () => {
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
      defaultProps: {
        color: 'primary',
        size: 'sm',
      },
    })

    const { root } = clax()

    expect(root({ color: 'secondary' })).toBe('base-root-style-1 vars-color-secondary-root-style-1 vars-size-sm-root-style-1')
  })

  it('unit props override global props and default props', () => {
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
      defaultProps: {
        color: 'primary',
        size: 'sm',
      },
    })

    const { root } = clax({
      color: 'secondary',
    })

    expect(root({ color: 'success' })).toBe('base-root-style-1 vars-color-success-root-style-1 vars-size-sm-root-style-1')
    expect(root({ size: 'md' })).toBe('base-root-style-1 vars-color-secondary-root-style-1 vars-size-md-root-style-1')
    expect(root({ color: 'success', size: 'lg' })).toBe('base-root-style-1 vars-color-success-root-style-1 vars-size-lg-root-style-1')
  })
})
