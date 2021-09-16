<template>
  <div class="song-group">
    <div class="explain">
      <el-row :gutter="30">
        <el-col :span="3" class="other">序号</el-col>
        <el-col :span="6">音乐标题</el-col>
        <el-col :span="7">歌手</el-col>
        <el-col :span="5">专辑</el-col>
        <el-col :span="3">时长</el-col>
      </el-row>
    </div>
    <song :track="track" :index="index+1" v-for="(track,index) in tracksCopy"
          :key="index" @dblclick.native="play(track,index)" />
  </div>
</template>

<script>
import Song from './Song.vue'

import { mapMutations } from 'vuex'
import { infiniteScroll } from 'common/mixin'

export default {
  mixins: [infiniteScroll],
  components: { Song },
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      tracksLength: 200
    }
  },
  computed: {
    tracksCopy () {
      if (this.tracks.length > 0) {
        const copy = Array.from(this.tracks)

        /**
         * 若实际长度大于限制长度，则限制并添加滚动监听
         * 否则关闭滚动监听
         */
        if (this.tracks.length > this.tracksLength) {
          copy.length = this.tracksLength
          this.setInfiniteScrollDisabled(false)
        } else {
          this.setInfiniteScrollDisabled(true)
        }

        return copy
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapMutations([
      'addToPlayList',
      'setInfiniteScrollDisabled'
    ]),

    addTracksLength () {
      console.log('length++')
      if (this.tracksLength + 200 < this.tracks.length) {
        this.tracksLength += 200
      } else {
        this.tracksLength = this.tracks.length
      }
    },

    play (track, index) {
      this.addToPlayList({
        playList: this.tracks,
        index: index
      })
    }

  },
  mounted () {
    this.$bus.$on('infiniteScroll', this.addTracksLength) // 添加滚动监听，用于添加显示歌曲组长度
    this.$bus.$on('playAll', this.play) // 将当前页面的所有歌曲添加
  },
  destroyed () {
    this.$bus.$off('playAll')
  },
  deactivated () {
    this.$bus.$off('playAll')
  }
}
</script>

<style lang="less" scoped>
.explain {
  background-color: white;
  height: 3rem;
  line-height: 3rem;
  color: var(--color-main);
  font-weight: bold;
}

.other {
  padding-left: 23px !important;
}
</style>