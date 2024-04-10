<script setup lang="ts">
import { ref } from 'vue'

import { ucv } from '@claxjs/ucv'

const selected = ref(false)

const checkbox = ucv({
  base: {
    root: 'inline-flex items-center gap-x-2 shrink-0',
    box: [
      'relative inline-flex items-center justify-center size-6 overflow-clip',
      'border-2 border-solid border-[--vp-c-text-1] rounded-1.5',
    ],
    icon: '',
    label: 'text-sm',
  },
})

const checkboxClax = checkbox()
</script>

<template>
  <PreviewBox>
    <label :class="checkboxClax.root()">
      <span :class="checkboxClax.box()">
        <svg v-if="selected" :class="checkboxClax.icon()" viewBox="0 0 24 24">
          <Icons name="heart" />
        </svg>
      </span>
      <span :class="checkboxClax.label()">现在还点不了！你觉得缺了什么？🤔</span>
    </label>
  </PreviewBox>
</template>
