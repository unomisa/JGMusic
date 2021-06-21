<template>
  <el-col :span="6">
    <play-bar-list />
  </el-col>
</template>

<script>
import PlayBarList from './childComp/PlayBarList..vue'

export default {
  components: {
    PlayBarList
  }

}
</script>

<style lang="less" scoped>
</style>