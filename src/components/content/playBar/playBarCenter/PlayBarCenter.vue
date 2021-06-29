<template>
  <el-col :span="10" class="center">
    <play-bar-control />
    <play-bar-progress />
  </el-col>
</template>

<script>
import PlayBarControl from './childComp/PlayBarControl.vue'
import PlayBarProgress from './childComp/PlayBarProgress.vue'

export default {
  components: {
    PlayBarControl,
    PlayBarProgress
  }
}
</script>

<style lang="less" scoped>
.center {
  height: inherit;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
</style>