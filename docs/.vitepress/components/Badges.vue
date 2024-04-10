<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <p flex="~ gap-2" h-5>
    <a :href="`https://www.npmjs.com/package/@claxjs/${name}`" target="_blank"><img :src="`https://img.shields.io/npm/v/@claxjs/${name}?color=90D26D&labelColor=18181B&label=npm`" alt="NPM version"></a>
    <a :href="`https://www.npmjs.com/package/@claxjs/${name}`" target="_blank"><img :src="`https://img.shields.io/npm/dw/@claxjs/${name}?color=90D26D&labelColor=18181B&label=downloads`" alt="NPM downloads"></a>
    <a :href="`https://github.com/claxjs/${name}/tree/main`" target="_blank"><img :src="`https://img.shields.io/github/license/claxjs/${name}?style=flat&labelColor=18181B&color=90D26D&label=license`" alt="LICENSE"></a>
    <a :href="`https://github.com/claxjs/${name}/tree/main`" target="_blank"><img src="https://img.shields.io/badge/source-a?logo=github&labelColor=18181B&color=90D26D" alt="GitHub"></a>
  </p>
</template>
