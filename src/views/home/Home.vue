<template>
  <div v-bar :style="scrollStyle">
    <div class="home" ref="container">
      <el-container>
        <home-header />
        <home-main />
        <el-footer>Footer</el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
// 组件
import HomeHeader from './childComp/homeHeader/HomeHeader.vue'
import HomeMain from './childComp/homeMain/HomeMain.vue'

// 其它
import { mapGetters } from 'vuex'

export default {
  components: {
    HomeHeader,
    HomeMain
  },
  data () {
    return {
      scrollTop: 0
    }
  },
  computed: {
    ...mapGetters([
      'isExistCurrentPlayMusic'
    ]),
    scrollStyle () {
      return {
        height: !this.isExistCurrentPlayMusic ? 'calc(100vh - var(--nav-bar-height))' : 'calc(100vh - var(--nav-bar-height) - var(--play-bar-height))',
        position: 'absolute',
        top: '80px'
      }
    }
  },
  // home活跃时重新定位高度(使用vuebar照成的bug，原生的滚动条不会有)
  activated () {
    this.$refs.container.scrollTop = this.scrollTop
  },
  beforeRouteLeave (to, from, next) {
    this.scrollTop = this.$refs.container.scrollTop
    next()
  }
}
</script>

<style lang="less" scoped>
.el-container {
  width: var(--width-main);
  margin: 0 auto;
}

.el-footer {
  background-color: gray;
}
</style>