<style lang="scss" scoped>
.wrapper {
  @apply relative h-screen w-full flex flex-row flex-wrap;
  video {
    @apply w-full h-full;
    object-fit: cover;
  }
  .pult {
    @apply fixed flex flex-row flex-wrap w-full py-4 justify-center content-center items-center px-4;
    z-index: 10000;
    bottom: 0px;
  }
  .screenshot-wrapper {
    @apply fixed flex flex-row h-screen items-start content-start;
    z-index: 10000;
    top: 0px;
    right: 0px;
    width: 500px;
  }
}
</style>

<template lang="pug">
div(ref="refWrapper").wrapper
  //- screenshot
  div(v-if="state.screenshotSrc").screenshot-wrapper
    img(
      :src="state.screenshotSrc"
      :style="{objectFit: 'contain'}"
    )
  //- menu
  //- pult
  div(v-if="state.pultShow").pult
    div(
      :style=`{maxWidth: '800px', height: '100px', borderRadius: '0px',}`
      @click="timelineClick"
      ).relative.flex.flex-row.w-full.bg-blue-500
      //- fragment
      div(
        v-if="clipFragment.length"
        :style=`{
          position: 'absolute', zIndex: 110,
          left: clipFragment[0]*100+'%', width: (clipFragment[1]-clipFragment[0])*100+'%',
          height: '100%',
          opacity: 0.5,
          pointerEvents: 'none',
        }`
      ).bg-red-500
      //- currentTime
      div(
        :style=`{
          width: (state.currentTime/state.duration)*100+'%', pointerEvents: 'none',
          borderRadius: '0px', zIndex: 100,
        }`
        ).h-full.bg-white
  video(
    ref="refVideo"
    src="/video-0.mp4"
    :autoplay="true"
    :style=`{
      opacity: state.videoShow ? 1 : 0,
    }`
    @click="videoClick"
    @loadeddata="videoLoadeddata"
    @timeupdate="videoTimeupdate"
    @seeked="videoSeeked"
  )
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onKeyStroke, useWindowSize } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const { width, height } = useWindowSize()
const refVideo = ref<HTMLElement | null>(null)
const refWrapper = ref(null)
const state = reactive({
  duration: 0,
  currentTime: 0,
  pultShow: true,
  videoShow: false,
  screenshotSrc: null,
})

const videoSetQuery = (start, end) => {
  console.log('videoSetQuery', start, end)
  refVideo.value.currentTime = start
  state.videoShow = true
}
const clipFragment = computed(() => {
  if (route.query.start) {
    return [parseInt(route.query.start) / state.duration, parseInt(route.query.end) / state.duration]
  }
  else {
    return []
  }
})
watch(
  () => route.query.start,
  async(to, from) => {
    console.log('route.query.start', to)
    await nextTick()
    videoSetQuery(to, from)
  },
)
const videoClick = (e: MouseEvent) => {
  console.log('[videoClick]')
  // console.log('videoClick', e)
  if (e.target?.paused) {
    e.target?.play()
  }
  else {
    e.target?.pause()
  }
}
const videoLoadeddata = (e: any) => {
  console.log('[videoLoadeddata]', e)
  state.duration = e.target.duration
  if (route.query.start) videoSetQuery(route.query.start, route.query.end)
}
const videoTimeupdate = (e: any) => {
  // console.log('[videoTimeupdate]', e)
  state.currentTime = e.target.currentTime
}
const timelineClick = (e: MouseEvent) => {
  console.log('[timelineClick]', refVideo.value)
  // console.log({ layerX: e.layerX, layerY: e.layerY, percent: e.layerX / e.target.clientWidth })
  const t = (e.layerX / e.target.clientWidth) * refVideo.value.duration
  console.log('[timelineClick] t', t)
  state.currentTime = t
  refVideo.value.currentTime = t
}
const videoSeeked = (e) => {
  console.log('[videoSeeked]', e)
  const start = e.target.currentTime
  let end = e.target.currentTime + 10
  if (end > state.duration) end = state.duration
  router.push({ query: { start, end } })
}
onKeyStroke(
  (e: any) => {
    // console.log('[onKeyStroke]', e)
    return e.code === 'Space'
  },
  () => {
    videoClick({ target: refVideo.value })
  },
  { eventName: 'keydown' },
)
onKeyStroke(
  (e: any) => {
    // console.log('[onKeyStroke]', e)
    return e.code === 'KeyB'
  },
  () => {
    videoScreenshot()
  },
  { eventName: 'keydown' },
)
const videoScreenshot = () => {
  console.log('[videoScreenshot]')
  const canvas = document.createElement('canvas')
  canvas.width = refVideo.value.videoWidth
  canvas.height = refVideo.value.videoHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(refVideo.value, 0, 0, canvas.width, canvas.height)
  state.screenshotSrc = canvas.toDataURL('image/jpeg')
}
</script>

<route lang="yaml">
meta:
  layout: home
</route>
