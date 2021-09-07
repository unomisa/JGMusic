<template>
  <div class="home">
    <el-container>
      <home-main />
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
// 组件
import HomeMain from './childComp/HomeMain.vue'

// 其它

export default {
  components: {
    HomeMain
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