<template>
  <div id="app" ref="app">
    <keep-alive exclude="musicDetail">
      <router-view />
    </keep-alive>

    <play-bar />
  </div>
</template>

<script>
import PlayBar from 'components/content/playBar/PlayBar.vue'

export default {
  components: {
    PlayBar
  },
  mounted () {
    // setTimeout(() => {
    //   this.$vuebar.refreshScrollbar(this.$refs.container, {})
    //   console.log('结果输出')
    // }, 10000),
  }
}
</script>

<style lang="less" scoped>
@import "assets/css/base.css";
</style>
