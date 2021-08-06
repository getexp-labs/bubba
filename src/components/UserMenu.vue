<style lang="scss" scoped>
.wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>

<template lang="pug">
.wrapper
</template>

<script setup lang="ts">
import { useAuth } from '~/use/auth'
const { state: stateAuth } = useAuth()
</script>
