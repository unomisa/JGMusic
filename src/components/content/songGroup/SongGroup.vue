<template>
  <div class="song-group">
    <div class="explain">
      <el-row :gutter="30">
        <el-col :span="areas.others" class="other">序号</el-col>
        <el-col :span="areas.name">音乐标题</el-col>
        <el-col :span="areas.artists">歌手</el-col>
        <el-col :span="areas.album">专辑</el-col>
        <el-col :span="areas.duration">时长</el-col>
        <el-col :span="areas.pop">热度</el-col>
      </el-row>
    </div>
    <song :track="track" :index="index+startIndex+1"
          v-for="(track,index) in tracksPart" :key="track.id" :areas="areas"
          @dblclick.native="play(track,index)" />
  </div>
</template>

<script>
import Song from './Song.vue'

import { mapMutations } from 'vuex'
import { infiniteScroll, playAll } from 'common/mixin'

export default {
  mixins: [infiniteScroll, playAll],
  components: { Song },
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    },
    areas: {
      type: Object,
      default () {
        return {
          others: 3,
          name: 6,
          artists: 7,
          album: 5,
          duration: 3,
          pop: 0
        }
      }
    },
    startIndex: { // 开始索引
      type: Number,
      default: 0
    },
    single: { // 是否单独添加歌曲
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tracksLength: 150 // 初始渲染长度
    }
  },
  computed: {
    tracksCopy () {
      // console.log('计算copy')
      if (this.tracks.length > 0) {
        return Array.from(this.tracks)
      } else {
        return []
      }
    },
    tracksPart () {
      // console.log('计算part：', this.tracksLength)
      if (this.tracks.length > this.tracksLength) {
        return this.tracksCopy.slice(0, this.tracksLength)
      } else {
        return this.tracksCopy
      }
    }
  },
  methods: {
    ...mapMutations([
      'addToPlayList',
      'setInfiniteScrollDisabled',
      'addMusic'
    ]),

    addTracksLength () {
      if (this.tracks.length === 0) return // 长度为0时不执行
      console.log('length++')
      if ((this.tracksLength + 300) < this.tracks.length) {
        this.tracksLength += 300
        this.setInfiniteScrollDisabled(false) // 有余则开启滚动监听
      } else {
        this.tracksLength = this.tracks.length
        this.setInfiniteScrollDisabled(true) // 无余关闭滚动监听
      }
    },

    // 分片渲染数据
    shardRendering () {

    },

    play (track, index) {
      if (this.single) {
        this.addMusic(track)
      } else {
        this.addToPlayList({
          playList: this.tracks,
          index: index
        })
      }
    }

  },
  watch: {
    // 传入数据时使可以加载
    tracks (newVal) {
      if (newVal.length > 0) {
        this.setInfiniteScrollDisabled(false) // 有歌曲时开启监听
      }
    }
  },
  mounted () {
    this.$bus.$on('playAll', this.play) // 将当前页面的所有歌曲添加
    this.$bus.$on('infiniteScroll', this.addTracksLength) // 添加滚动监听，用于添加显示歌曲组长度
  },
  activated () {
    this.$bus.$on('playAll', this.play) // 将当前页面的所有歌曲添加
    this.$bus.$on('infiniteScroll', this.addTracksLength) // 添加滚动监听，用于添加显示歌曲组长度
  }
}
</script>

<style lang="less" scoped>
.song-group {
  position: relative;
}

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