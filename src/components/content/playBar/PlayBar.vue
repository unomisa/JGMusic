<template>
  <div class="play-bar" v-if="isExistCurrentPlayMusic">
    <el-row type="flex" align="middle" justify="space-between">
      <play-bar-left />

      <play-bar-center />

      <play-bar-right />
    </el-row>
    <audio :src="currentPlayMusic.src" @canplay="canplay" @play="play"
           @pause="pause" @ended="ended" ref="music" />
  </div>
</template>

<script>
import PlayBarLeft from './playBarLeft/PlayBarLeft.vue'
import PlayBarCenter from './playBarCenter/PlayBarCenter.vue'
import PlayBarRight from './playBarRight/PlayBarRight.vue'

import Vue from 'vue'
import { mapMutations, mapGetters, mapState } from 'vuex'
import { getSongUrl } from 'network/common'

export default {
  components: {
    PlayBarLeft,
    PlayBarCenter,
    PlayBarRight
  },
  computed: {
    ...mapState([
      'isLoadingMusic',
      'isPaused',
      'listCurrentIndex'
    ]),

    ...mapGetters([
      'currentPlayMusic',
      'isExistCurrentPlayMusic'
    ])
  },
  methods: {
    ...mapMutations([
      'setMusicSrc',
      'setCurrentBroadcast',
      'setIsLoadingMusic',
      'setIsPaused',
      'setListCurrentIndex'
    ]),

    // * audio 事件
    canplay () {
      this.setIsLoadingMusic(false) // 可以播放之后设置加载完成
      this.setIsPaused(false)
      this.$music.play()
    },

    play () {
      this.setIsPaused(false)
    },

    pause () {
      this.setIsPaused(true)
    },

    // 播放完毕触发
    ended () {
      this.setListCurrentIndex(this.listCurrentIndex + 1)
    }
  },
  watch: {
    currentPlayMusic (newPlay, oldPlay) {
      if (newPlay.id !== oldPlay.id) {
        this.setCurrentBroadcast(newPlay)
        oldPlay !== undefined && (this.setCurrentBroadcast(oldPlay))
        this.setIsLoadingMusic(true) // 换歌之后设置它正在加载
        getSongUrl(newPlay.id).then(res => {
          this.setMusicSrc(res.data[0].url)
        })
      }
    },

    isExistCurrentPlayMusic () {
      this.$nextTick(() => {
        Vue.prototype.$music = this.$refs.music
        this.$music.volume = 0.5 // 初始化音量大小
      })
    }

  }
}
</script>

<style lang="less" scoped>
.play-bar {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: var(--play-bar-height);
  padding: 0.7rem 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>