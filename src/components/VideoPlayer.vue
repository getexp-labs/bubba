<style lang="scss" scoped>
</style>

<template lang="pug">
vue-plyr(
  ref="refPlyr"
  :options="options")
  video(
    controls
    crossorigin
    playsinline)
    source(
      size="720"
      :src="src"
      type="video/mp4")
slot(v-if="playerLoaded")
</template>

<script setup lang="ts">
const props = defineProps({
  src: { type: String },
})
const options = reactive({
})
const refPlyr = ref(null) as any
const playerLoaded = ref(false)
const player = computed(() => refPlyr?.value?.player)
provide('plyr', refPlyr)

// const currentTime = computed(() => player.value.currentTime)

watch(
  () => refPlyr?.value,
  (to, from) => {
    if (to) {
      playerLoaded.value = true
      // refPlyr?.value?.player?.on('play', (e) => {
      //   console.log('play', e)
      // })
    }
  },
)
</script>
