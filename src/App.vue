<template>
  <div id="app" ref="app">
    <nav-bar />

    <keep-alive exclude="UserDetail">
      <router-view class="view" :style="scrollStyle" :key="$route.fullPath" />
    </keep-alive>

    <play-bar />
  </div>
</template>

<script>
import PlayBar from 'components/content/playBar/PlayBar.vue'
import NavBar from './components/content/navBar/NavBar.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    PlayBar,
    NavBar
  },
  computed: {
    ...mapGetters([
      'isExistCurrentPlayMusic'
    ]),

    // 给一个统一高度
    scrollStyle () {
      return {
        height: !this.isExistCurrentPlayMusic ? 'calc(100vh - var(--nav-bar-height))' : 'calc(100vh - var(--nav-bar-height) - var(--play-bar-height))'
      }
    }
  }
}
</script >

<style lang="less" scoped>
@import "assets/css/base.css";

#app {
  padding-top: var(--nav-bar-height);
}
</style>
