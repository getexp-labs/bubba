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
  title: 'Supa Bubba Base',
  meta: [
    { name: 'description', content: 'When you click you BAM' },
  ],
})
</script>
