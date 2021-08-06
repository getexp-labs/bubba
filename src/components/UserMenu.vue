<style lang="scss" scoped>
.wrapper {
  @apply fixed bg-red-500;
  right: 30px;
  top: 30px;
  z-index: 99999;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  img {
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>

<template lang="pug">
div(
  @click="handleClick"
  ).wrapper
  img(
    v-if="stateAuth.user"
    draggable="false"
    :src="stateAuth.user.user_metadata.avatar_url"
    ).w-full.h-full
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useAuth } from '~/use/auth'

const { width, height } = useWindowSize()
const { state: stateAuth, signIn } = useAuth()

const w = null
const handleClick = (e) => {
  console.log('[UserMenu] handleClick', e)
  // const wWidth = 500
  // const wHeight = 800
  // const left = (width.value - wWidth) / 2
  // const top = (height.value - wHeight) / 2
  // const windowFeatures = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${wWidth},height=${wHeight},left=${left},top=${top}`
  // w = window.open(`${window.location.href}auth`, 'Auth', windowFeatures)
  signIn()
}
</script>
