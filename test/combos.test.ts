import { describe, expect, it } from 'vitest'

import { ucv } from '../src'

describe('ucv - Combos Basic Usage', () => {
  it('basic usage', () => {
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

    expect(root()).toBe('base-root-style-1 vars-color-primary-root-style-1 vars-disabled-true-root-style-1 combos-vars-color-primary-disabled-true-root-style-1')
    expect(root({ color: 'primary', disabled: false })).toBe('base-root-style-1 vars-color-primary-root-style-1 vars-disabled-false-root-style-1 combos-vars-color-primary-disabled-false-root-style-1')

    expect(title()).toBe('base-title-style-1 vars-color-secondary-title-style-1 vars-disabled-false-title-style-1')
  })

  it('combo with string type name', () => {
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
      combosVars: [
        {
          color: 'primary',
          size: 'sm',
          class: {
            root: 'combos-vars-color-primary-size-sm-root-style-1',
          },
        },
        {
          color: 'secondary',
          size: 'md',
          class: {
            root: 'combos-vars-color-secondary-size-md-root-style-1',
          },
        },
      ],
      defaultProps: {
        color: 'primary',
        size: 'sm',
      },
    })

    const { root } = clax()

    expect(root()).toBe('base-root-style-1 vars-color-primary-root-style-1 vars-size-sm-root-style-1 combos-vars-color-primary-size-sm-root-style-1')
  })

  it('combo with array type name', () => {
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
      combosVars: [
        {
          color: ['primary', 'success'],
          size: 'sm',
          class: {
            root: 'combos-vars-color-primary&success-size-sm-root-style-1',
          },
        },
        {
          color: 'secondary',
          size: 'md',
          class: {
            root: 'combos-vars-color-secondary-size-md-root-style-1',
          },
        },
      ],
      defaultProps: {
        color: 'primary',
        size: 'sm',
      },
    })

    const { root: root1 } = clax()

    const { root: root2 } = clax({
      color: 'success',
      size: 'sm',
    })

    expect(root1()).toBe('base-root-style-1 vars-color-primary-root-style-1 vars-size-sm-root-style-1 combos-vars-color-primary&success-size-sm-root-style-1')
    expect(root2()).toBe('base-root-style-1 vars-color-success-root-style-1 vars-size-sm-root-style-1 combos-vars-color-primary&success-size-sm-root-style-1')
  })
})

describe('ucv - Combos With Any Props', () => {
  it('with default props', () => {
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
      combosVars: [
        {
          color: 'primary',
          size: 'sm',
          class: {
            root: 'combos-vars-color-primary-size-sm-root-style-1',
          },
        },
      ],
      defaultProps: {
        color: 'primary',
        size: 'sm',
      },
    })

    const { root } = clax()

    expect(root()).toBe('base-root-style-1 vars-color-primary-root-style-1 vars-size-sm-root-style-1 combos-vars-color-primary-size-sm-root-style-1')
  })

  it('with global props', () => {
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
      combosVars: [
        {
          color: 'primary',
          size: 'sm',
          class: {
            root: 'combos-vars-color-primary-size-sm-root-style-1',
          },
        },
        {
          color: 'secondary',
          size: 'md',
          class: {
            root: 'combos-vars-color-secondary-size-md-root-style-1',
          },
        },
      ],
      defaultProps: {
        color: 'primary',
        size: 'sm',
      },
    })

    const { root } = clax({
      color: 'secondary',
      size: 'md',
    })

    expect(root()).toBe('base-root-style-1 vars-color-secondary-root-style-1 vars-size-md-root-style-1 combos-vars-color-secondary-size-md-root-style-1')
  })

  it('with unit props', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
        other: 'base-other-style-1',
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
        radius: {
          none: {},
        },
      },
      combosVars: [
        {
          color: 'primary',
          size: 'sm',
          class: {
            root: 'combos-vars-color-primary-size-sm-root-style-1',
            other: 'combos-vars-color-primary-size-sm-other-style-1',
          },
        },
        {
          color: 'secondary',
          size: 'md',
          class: {
            root: 'combos-vars-color-secondary-size-md-root-style-1',
          },
        },
      ],
      defaultProps: {
        color: 'primary',
        size: 'sm',
        radius: 'none',
      },
    })

    const { root, other } = clax()

    expect(root()).toBe('base-root-style-1 vars-color-primary-root-style-1 vars-size-sm-root-style-1 combos-vars-color-primary-size-sm-root-style-1')
    expect(other()).toBe('base-other-style-1 combos-vars-color-primary-size-sm-other-style-1')

    expect(root({ color: 'secondary', size: 'md' })).toBe('base-root-style-1 vars-color-secondary-root-style-1 vars-size-md-root-style-1 combos-vars-color-secondary-size-md-root-style-1')
  })

  it('when part of props is within combos scope', () => {
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
        radius: {
          none: {
            root: 'vars-radius-none-root-style-1',
          },
          full: {
            root: 'vars-radius-full-root-style-1',
          },
        },
      },
      combosVars: [
        {
          color: 'primary',
          size: 'sm',
          class: {
            root: 'combos-vars-color-primary-size-sm-root-style-1',
          },
        },
        {
          color: 'secondary',
          size: 'md',
          class: {
            root: 'combos-vars-color-secondary-size-md-root-style-1',
          },
        },
      ],
      defaultProps: {
        color: 'primary',
        size: 'sm',
      },
    })

    const { root } = clax({
      color: 'secondary',
      size: 'md',
      radius: 'none',
    })

    expect(root()).toBe('base-root-style-1 vars-color-secondary-root-style-1 vars-size-md-root-style-1 vars-radius-none-root-style-1 combos-vars-color-secondary-size-md-root-style-1')
  })
})

describe('ucv - Combos With Same Props', () => {
  it('merge the same combo', () => {
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
      combosVars: [
        {
          color: 'primary',
          size: 'sm',
          class: {
            root: 'combos-vars-color-primary-size-sm-root-style-1',
          },
        },
        {
          color: 'primary',
          size: 'sm',
          class: {
            root: 'combos-vars-color-primary-size-sm-root-style-2',
          },
        },
      ],
      defaultProps: {
        color: 'primary',
        size: 'sm',
      },
    })

    const { root } = clax()

    expect(root()).toBe('base-root-style-1 vars-color-primary-root-style-1 vars-size-sm-root-style-1 combos-vars-color-primary-size-sm-root-style-1 combos-vars-color-primary-size-sm-root-style-2')
  })
})
