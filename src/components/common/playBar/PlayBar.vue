<template>
  <div class="play-bar" v-if="isShowPlayBar">
    <el-row style="height:inherit;" type="flex" align="middle"
            justify="space-between">
      <play-bar-left :playMusic="playMusic" />

      <play-bar-center :isPlay="isPlay" :isLoad="isLoad" />

      <play-bar-right />
    </el-row>
    <audio :src="playMusic.src" @canplay="canplay" @play="play" @pause="pause"
           ref="music" />
  </div>
</template>

<script>
import PlayBarLeft from './playBarLeft/PlayBarLeft.vue'
import PlayBarCenter from './playBarCenter/PlayBarCenter.vue'
import PlayBarRight from './playBarRight/PlayBarRight.vue'

import Vue from 'vue'
import { mapState } from 'vuex'

export default {
  components: {
    PlayBarLeft,
    PlayBarCenter,
    PlayBarRight
  },
  data () {
    return {
      isPlay: false,
      isLoad: true
    }
  },
  computed: {
    ...mapState([
      'playMusic'
    ]),
    isShowPlayBar () {
      return Object.keys(this.playMusic).length > 0
    }
  },
  methods: {

    // * audio 事件
    canplay () {
      this.isLoad = false
      this.$music.play()
    },

    play () {
      this.isPlay = true
    },

    pause () {
      this.isPlay = false
    }

  },
  watch: {
    isShowPlayBar () {
      this.$nextTick(() => {
        Vue.prototype.$music = this.$refs.music // 将music实例挂载至Vue
      })
    },

    // 每次切换歌曲使之在加载状态
    playMusic () {
      this.isLoad = true
    }
  }
}
</script>

<style lang="less" scoped>
.play-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: var(--play-bar-height);
  padding: 0 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>