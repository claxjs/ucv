import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 3000,
    name: 'unit',
    exclude: [...defaultExclude],
  },
})
