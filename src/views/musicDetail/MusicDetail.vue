<template>
  <transition name="el-zoom-in-bottom">
    <!-- <div class="detail">
      <lyric-roll :lyric="lrc" :tlyric="tlyric" />
    </div> -->
    <div>
      <music-detail-header />
      <div v-bar class="scroll">
        <div class="container" ref="container">
          <el-container>
            <music-detail-main />
            <el-footer>Footer</el-footer>
          </el-container>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import MusicDetailHeader from 'views/musicDetail/childComp/header/MusicDetailHeader'
import MusicDetailMain from 'views/musicDetail/childComp/main/MusicDetailMain.vue'

export default {
  name: 'musicDetail',
  components: {
    MusicDetailHeader,
    MusicDetailMain
  }
}
</script>

<style lang="less" scoped>
.scroll {
  height: calc(100vh - var(--play-bar-height) - var(--nav-bar-height));
  position: absolute;
  top: 80px;
}
</style>