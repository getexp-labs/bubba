<style lang="scss" scoped>
</style>

<template lang="pug">
</template>

<script setup lang="ts">
import { useAuth } from '~/use/auth'
const { state: stateAuth, signIn } = useAuth()

onMounted(() => {
  console.log('[AuthPage] onMounted')
  signIn()
})
</script>
