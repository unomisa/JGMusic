<template>
  <div v-bar>
    <div class="home" ref="container">
      <el-container>
        <home-main />
        <el-footer>Footer</el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
// 组件
import HomeMain from './childComp/homeMain/HomeMain.vue'

// 其它

export default {
  components: {
    HomeMain
  },
  data () {
    return {
      scrollTop: 0
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