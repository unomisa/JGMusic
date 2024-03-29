<template>
  <div class="play-bar" v-show="isExistCurrentPlayMusic">
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
      this.$music.play() // 加载完毕自动播放
    },

    play () {
      this.setIsLoadingMusic(false) // 可以播放之后设置加载完成
      this.setIsPaused(false) // 播放时设置没有暂停
      this.$bus.$emit('clickPause', false)
    },

    pause () {
      this.setIsPaused(true) // 设置播放状态为暂停
    },

    // 播放完毕触发
    ended () {
      console.log('播放完毕')
      // this.$bus.$emit('nextPlay', 'ended') // 播放完毕后,下一首
      this.$control.next('ended') // 下一首,类别为自然播放
    },

    reset () {
      this.$music && this.$music.pause() // 暂停当前播放歌曲,以免切换后还在播放,新加入
      // this.pause() // 切换歌曲暂停歌曲，暂停，出bug来找它
      this.currentPlayMusicUrl = null // 设置歌曲url为空，等待加载
      this.setIsLoadingMusic(true) // 换歌之后设置它正在加载
    }
  },
  watch: {
    currentPlayMusic (newPlay, oldPlay) {
      if (newPlay.id !== oldPlay.id && this.playList.length > 0) {
        this.reset() // 不能甩在外面,不然添加歌曲后歌曲不会播放了
        newPlay.state.currentBroadcast = true // 设置属性为当前播放
        'state' in oldPlay && (oldPlay.state.currentBroadcast = false)

        // 请求歌曲url
        getSongUrl(newPlay.id).then(res => {
          if (res.code === 200) {
            this.currentPlayMusicUrl = res.data[0].url

            // 如果该歌曲无法播放，则跳过
            if (!this.currentPlayMusicUrl) {
              const previousMusic = this.playList[this.listCurrentIndex - 1]
              console.log('上一首歌曲为：', previousMusic)
              if (!previousMusic || previousMusic.id === oldPlay.id) {
                this.$control.next('invalid')
              } else {
                this.$control.previous('invalid') // 上一首，类型为无效的
              }
            }
          }
        })
      } if (this.playList.length === 0) { // 播放列表为空则重置
        this.reset()
      }
    },

    // 改变后挂载music
    isExistCurrentPlayMusic (newValue) {
      if (newValue) {
        this.$nextTick(() => {
          Vue.prototype.$music = this.$refs.music
          this.$music.volume = 0.3 // 初始化音量大小
        })
      }
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