<template>
  <div class="play-bar" v-if="isExistCurrentPlayMusic">
    <el-row type="flex" align="middle" justify="space-between">
      <play-bar-left />

      <play-bar-center />

      <play-bar-right />
    </el-row>
    <audio :src="currentPlayMusicUrl" @canplay="canplay" @play="play"
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
  data () {
    return {
      currentPlayMusicUrl: ''
    }
  },
  components: {
    PlayBarLeft,
    PlayBarCenter,
    PlayBarRight
  },
  computed: {
    ...mapState([
      'listCurrentIndex',
      'playList'
    ]),

    ...mapGetters([
      'currentPlayMusic',
      'isExistCurrentPlayMusic'
    ])
  },
  methods: {
    ...mapMutations([
      'setIsLoadingMusic',
      'setIsPaused',
      'setListCurrentIndex'
    ]),

    // * audio 事件
    canplay () {
      this.setIsLoadingMusic(false) // 可以播放之后设置加载完成
      this.setIsPaused(false)
      // this.play()
      this.$music.play()
    },

    play () {
      this.setIsPaused(false)
      this.$bus.$emit('clickPause', false)
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
        // * 状态设置
        this.pause() // 暂停，出bug来找它
        this.currentPlayMusicUrl = '' // 设置歌曲url为空，等待加载
        this.setIsLoadingMusic(true) // 换歌之后设置它正在加载
        newPlay.state.currentBroadcast = true
        'state' in oldPlay && (oldPlay.state.currentBroadcast = false)

        // 请求歌曲url
        getSongUrl(newPlay.id).then(res => {
          if (res.code === 200) {
            this.currentPlayMusicUrl = res.data[0].url

            // 如果该歌曲无法播放，则跳过
            if (!this.currentPlayMusicUrl) {
              const previousMusic = this.playList[this.listCurrentIndex - 1]
              if (previousMusic.id === oldPlay.id) {
                this.setListCurrentIndex(this.listCurrentIndex + 1)
              } else {
                this.setListCurrentIndex(this.listCurrentIndex - 1)
              }
            }
          }
        })
      }
    },

    isExistCurrentPlayMusic () {
      this.$nextTick(() => {
        Vue.prototype.$music = this.$refs.music
        this.$music.volume = 0.3 // 初始化音量大小
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
  user-select: none;
}
</style>