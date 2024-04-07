import { describe, expect, it } from 'vitest'

import { ucv } from '../src'

describe('ucv - Single Base Units', () => {
  it('basic usage', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
        title: 'base-title-style-1',
      },
    })

    const { root, title } = clax()

    expect(root()).toBe('base-root-style-1')
    expect(title()).toBe('base-title-style-1')
  })

  it('string', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
      },
    })

    expect(clax().root()).toBe('base-root-style-1')
  })

  it('array', () => {
    const clax = ucv({
      base: {
        root: ['base-root-style-1', 'base-root-style-2'],
      },
    })

    const { root } = clax()

    expect(root()).toBe('base-root-style-1 base-root-style-2')
  })

  it('nested arrays', () => {
    const clax = ucv({
      base: {
        root: ['base-root-style-1', ['base-root-style-2']],
      },
    })

    const { root } = clax()

    expect(root()).toBe('base-root-style-1 base-root-style-2')
  })
})

describe('ucv - Multiple Base Units', () => {
  it('basic', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1 base-root-style-2',
        item: ['base-item-style-1', 'base-item-style-2'],
      },
    })

    const { root, item } = clax()

    expect(root()).toBe('base-root-style-1 base-root-style-2')
    expect(item()).toBe('base-item-style-1 base-item-style-2')
  })

  it('empty base', () => {
    const clax = ucv({
      base: {
        root: '',
        item: '',
      },
    })

    const { root, item } = clax()

    expect(root()).toBe('')
    expect(item()).toBe('')
  })

  it('nested arrays', () => {
    const clax = ucv({
      base: {
        root: ['base-root-style-1', ['base-root-style-2']],
        item: ['base-item-style-1', ['base-item-style-2', ['base-item-style-3']]],
      },
    })

    const { root, item } = clax()

    expect(root()).toBe('base-root-style-1 base-root-style-2')
    expect(item()).toBe('base-item-style-1 base-item-style-2 base-item-style-3')
  })
})

describe('ucv - Global props & Unit props', () => {
  it('use global props with single units', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
      },
    })

    const { root } = clax({
      class: {
        root: 'global-props-style-1 unit-props-style-2',
      },
    })

    expect(root()).toBe('base-root-style-1 global-props-style-1 unit-props-style-2')
  })

  it('use global props with multiple units', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
        item: ['base-item-style-1'],
      },
    })

    const { root, item } = clax({
      class: {
        root: 'global-props-root-style-1 unit-props-root-style-2',
      },
    })

    expect(root()).toBe('base-root-style-1 global-props-root-style-1 unit-props-root-style-2')
    expect(item()).toBe('base-item-style-1')
  })

  it('use unit props with single units', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
      },
    })

    const { root } = clax()

    expect(root({ class: 'unit-props-style-1' })).toBe('base-root-style-1 unit-props-style-1')
    expect(root({ class: 'unit-props-style-1' })).toBe('base-root-style-1 unit-props-style-1')
  })

  it('use unit props with multiple units', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
        item: ['base-item-style-1'],
      },
    })

    const { root, item } = clax()

    expect(root({ class: 'unit-props-root-style-1' })).toBe('base-root-style-1 unit-props-root-style-1')
    expect(item({ class: 'unit-props-item-style-1' })).toBe('base-item-style-1 unit-props-item-style-1')
  })

  it('use unit props and global props', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
        item: ['base-item-style-1'],
      },
    })

    const { root, item } = clax({
      class: {
        root: 'global-props-root-style-1',
      },
    })
    expect(root({ class: 'unit-props-root-style-1' })).toBe('base-root-style-1 global-props-root-style-1 unit-props-root-style-1')
    expect(item({ class: 'unit-props-item-style-1' })).toBe('base-item-style-1 unit-props-item-style-1')
  })
})
