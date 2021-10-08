<template>
  <div class="home">
    <el-container>
      <home-main />
    </el-container>
    <!-- <footer-declare /> -->
  </div>
</template>

<script>
import FooterDeclare from 'components/content/footer/FooterDeclare.vue'
// 组件
import HomeMain from './childComp/HomeMain.vue'

// 其它

export default {
  components: {
    HomeMain,
    FooterDeclare
  }
}
</script>

<style lang="less" scoped>
.el-container {
  width: var(--width-main);
  margin: 0 auto;
}
</style>