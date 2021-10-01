<style lang="scss">
.plyr__control{
  display: none;
}
</style>
<style lang="scss" scoped>
.vcw {
  @apply absolute flex flex-row flex-wrap w-full justify-center;
  bottom: 140px;
  .content {
    max-width: 600px;
    border-radius: 4px;
  }
  .btn {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    @apply flex flex-row items-center content-center justify-center;
  }
}
</style>

<template lang="pug">
.vcw
  .content.flex.flex-row.flex-wrap.w-full.bg-white.p-2
    div(@click="bubb.crop_video.from = state.currentTime").btn From
    .flex-1
      .flex.flex-row.flex-wrap.w-full
        div(@click="play").btn.ml-2 Play
        small() {{bubb.crop_video.from}}-{{bubb.crop_video.to}}
    div(@click="bubb.crop_video.to = state.currentTime").btn To
</template>

<script setup lang="ts">
const logger = inject('logger')('VideoCropper')
const plyr = inject('plyr')

const state = reactive({
  currentTime: 0,
  isPlaying: false,
  playBackwardWorking: false,
})

const bubb = reactive({
  // content_id: 1,
  content_id: { type: 'video', from: 'storage', src: '/video-0.mp4' },
  crop_video: {
    from: 0,
    to: 10,
    type: 'accent', // crop, accent, loop, styles(custom)
    isLooped: true,
    frames: [
      // { t: 0, focus: [0, 0, 100, 100], message: 'Hello' },
    ],
  },
})
watch(
  () => plyr._value,
  (to, from) => {
    if (to) {
      logger.log('plyr LOADED')
      to.player.media.playbackRate = 2
      to.player.on('timeupdate', (e) => {
        logger.log('onTimeupdate', e.detail.plyr.currentTime)
        state.currentTime = e.detail.plyr.currentTime
        if (state.isPlaying) {
          if (state.currentTime >= bubb.crop_video.to) {
            if (state.playBackwardWorking) return
            playBackward(bubb.crop_video.from, () => {
              logger.log('playBackward DONE')
              to.player.play()
            })
          }
          // if (state.currentTime <= bubb.crop_video.from) {
          //   to.player.currentTime = bubb.crop_video.from
          //   to.player.play()
          // }
          // if (state.currentTime >= bubb.crop_video.to || state.currentTime <= bubb.crop_video.from) {
          //   to.player.currentTime = bubb.crop_video.from
          // }
        }
      })
    }
  },
  { immediate: true },
)
const playBackward = (to, cb) => {
  logger.log('playBackward START')
  state.playBackwardWorking = true
  plyr.value.player.pause()
  const i = setInterval(() => {
    if (state.currentTime <= to) {
      state.playBackwardWorking = false
      clearInterval(i)
      cb()
    }
    else {
      logger.log('playBackward STEP')
      plyr.value.player.currentTime -= (60 / 1000)
    }
  }, 60)
}

const play = () => {
  logger.log('play')
  state.isPlaying = true
  plyr.value.player.toggleControls(false)
  plyr.value.player.currentTime = bubb.crop_video.from
  plyr.value.player.play()
  // playBackward(0, () => logger.log('playBackward DONE'))
}
</script>
