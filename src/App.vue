<style lang="scss">
.br {
  border: 1px solid red;
}
</style>

<template lang="pug">
router-view
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'bubba',
  meta: [
    { name: 'description', content: 'guboshlep' },
  ],
})

const logger = (id) => {
  return {
    log(...msg) {
      console.log(`[${id}]`, ...msg)
    },
  }
}
provide('logger', logger)
</script>
