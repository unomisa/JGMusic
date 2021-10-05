<template>
  <el-menu :default-active="activeIndex" mode="horizontal" :router="true">
    <el-menu-item index="/user/sub/artist">歌手</el-menu-item>
    <el-menu-item index="/user/sub/album">专辑</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: ''
    }
  },
  created () {
    this.activeIndex = this.$route.path // 初始化当前index
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  margin-bottom: 1rem;
}
</style>