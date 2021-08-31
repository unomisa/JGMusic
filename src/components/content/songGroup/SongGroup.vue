<template>
  <div class="song-group">
    <div class="explain">
      <el-row :gutter="50">
        <el-col :span="3" class="other">序号</el-col>
        <el-col :span="6">音乐标题</el-col>
        <el-col :span="7">歌手</el-col>
        <el-col :span="5">专辑</el-col>
        <el-col :span="3">时长</el-col>
      </el-row>
    </div>
    <song :track="track" :index="index+1" v-for="(track,index) in tracks"
          :key="index" @click.native="play(index)" />
  </div>
</template>

<script>
import Song from './Song.vue'

import { mapMutations } from 'vuex'

export default {
  components: { Song },
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    ...mapMutations([
      'addToPlayList'
    ]),

    play (index) {
      this.addToPlayList({
        playList: this.tracks,
        index: index
      })
    }
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
  padding-left: 40px !important;
}
</style>