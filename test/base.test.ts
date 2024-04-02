import { describe, expect, it } from 'vitest'

import { ucv } from '../src'

describe('ucv - Single Base Slot', () => {
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

describe('ucv - Multiple Base Slot', () => {
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

describe('ucv - Global props & Slot props', () => {
  it('use global props with single slot', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
      },
    })

    const { root } = clax({
      class: {
        root: 'global-props-style-1 slot-props-style-2',
      },
    })

    expect(root()).toBe('base-root-style-1 global-props-style-1 slot-props-style-2')
  })

  it('use global props with multiple slot', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
        item: ['base-item-style-1'],
      },
    })

    const { root, item } = clax({
      class: {
        root: 'global-props-root-style-1 slot-props-root-style-2',
      },
    })

    expect(root()).toBe('base-root-style-1 global-props-root-style-1 slot-props-root-style-2')
    expect(item()).toBe('base-item-style-1')
  })

  it('use slot props with single slot', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
      },
    })

    const { root } = clax()

    expect(root({ class: 'slot-props-style-1' })).toBe('base-root-style-1 slot-props-style-1')
    expect(root({ kuClass: 'slot-props-style-1' })).toBe('base-root-style-1 slot-props-style-1')
  })

  it('use slot props with multiple slot', () => {
    const clax = ucv({
      base: {
        root: 'base-root-style-1',
        item: ['base-item-style-1'],
      },
    })

    const { root, item } = clax()

    expect(root({ class: 'slot-props-root-style-1' })).toBe('base-root-style-1 slot-props-root-style-1')
    expect(item({ class: 'slot-props-item-style-1' })).toBe('base-item-style-1 slot-props-item-style-1')
  })

  it('use slot props and global props', () => {
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
    expect(root({ class: 'slot-props-root-style-1' })).toBe('base-root-style-1 global-props-root-style-1 slot-props-root-style-1')
    expect(item({ kuClass: 'slot-props-item-style-1' })).toBe('base-item-style-1 slot-props-item-style-1')
  })
})
