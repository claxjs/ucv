<script setup lang="ts">
import { computed, ref } from 'vue'

import { ucv } from '@claxjs/ucv'

const selected = ref(false)

const checkbox = ucv({
  base: {
    root: 'inline-flex items-center gap-x-2 shrink-0',
    box: [
      'relative inline-flex items-center justify-center size-6 overflow-clip',
      'border-2 border-solid border-[--vp-c-text-1] rounded-1.5',
      'after:(content-[""] absolute inset-0 bg-[--vp-c-brand] rounded-1 transition-all-300)',
    ],
    icon: 'z-1 animate-delay-0.6s animate-heart-beat',
    label: 'text-sm',
  },
  vars: {
    selected: {
      true: {
        box: ['after:(scale-100)'],
      },
      false: {
        box: ['after:(opacity-0 scale-50)'],
      },
    },
  },
})

const checkboxClax = computed(() => {
  return checkbox({ selected: selected.value })
})
</script>

<template>
  <PreviewBox>
    <label :class="checkboxClax.root()" @click="selected = !selected">
      <span :class="checkboxClax.box()">
        <svg v-if="selected" :class="checkboxClax.icon()" viewBox="0 0 24 24">
          <Icons name="heart" />
        </svg>
      </span>
      <span :class="checkboxClax.label()">整点尬的，点一下看看是什么？</span>
    </label>
  </PreviewBox>
</template>
