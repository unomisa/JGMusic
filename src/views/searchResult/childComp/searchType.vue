<template>
  <el-menu :default-active="activeIndex" mode="horizontal"
           @select="handleSelect">
    <el-menu-item index="1">单曲</el-menu-item>
    <el-menu-item index="100">歌手</el-menu-item>
    <el-menu-item index="10">专辑</el-menu-item>
    <el-menu-item index="1000">歌单</el-menu-item>
    <el-menu-item index="1002">用户</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  computed: {
    activeIndex () {
      return this.$route.meta.type
    }
  },
  methods: {
    handleSelect (index) {
      const keywords = this.$route.query.keywords
      this.$router.push({
        path: '/search/' + index,
        query: {
          keywords
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>