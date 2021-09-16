<template>
  <div id="app" :style="scrollStyle" v-infinite-scroll="load"
       infinite-scroll-distance="500"
       :infinite-scroll-disabled="infiniteScrollDisabled"
       :infinite-scroll-immediate="false" ref="scrollbar">

    <nav-bar />

    <keep-alive exclude="UserDetail,songListDetail" max="5">
      <router-view :key="$route.fullPath" />
    </keep-alive>

    <save-to-playlist />
    <back-top :target="$refs.scrollbar" />

    <play-bar />
  </div>
</template>

<script>
import PlayBar from 'components/content/playBar/PlayBar.vue'
import NavBar from './components/content/navBar/NavBar.vue'
import BackTop from 'components/common/backTop/BackTop.vue'
import SaveToPlaylist from 'components/content/savaToPlay/SaveToPlaylist.vue'

import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  components: {
    PlayBar,
    NavBar,
    BackTop,
    SaveToPlaylist
  },
  computed: {
    ...mapState([
      'infiniteScrollDisabled'
    ]),

    ...mapGetters([
      'isExistCurrentPlayMusic'
    ]),

    scrollStyle () { // 给与变化高度
      return {
        height: !this.isExistCurrentPlayMusic ? 'calc(100vh - var(--nav-bar-height))' : 'calc(100vh - var(--nav-bar-height) - var(--play-bar-height))'
      }
    }
  },
  methods: {
    ...mapMutations([
      'setInfiniteScrollDisabled'
    ]),

    load () {
      console.log('触发正在加载')
      this.setInfiniteScrollDisabled(true) // 每次加载使之停止继续加载
      this.$bus.$emit('infiniteScroll') // 发送加载事件
    },

    backTop (scrollTop = 0) {
      this.$refs.scrollbar.scrollTop = scrollTop
    }
  },
  mounted () {
    this.$bus.$on('scroll', this.backTop)
  },
  watch: {
    $route () {
      // console.log('路由改变')
      this.backTop()
    }
  }
}
</script >

<style lang="less" scoped>
@import "assets/css/base.css";

#app {
  backface-visibility: hidden;
  position: absolute;
  top: calc(var(--nav-bar-height));
  left: 0;
  right: 0;
  overflow-y: scroll;
  height: 100%;
}
</style>
