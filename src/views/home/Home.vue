<template>
  <div class="home">
    <home-header />
    <el-container>
      <home-main />
      <el-footer>Footer</el-footer>
    </el-container>

    <!-- <aplayer-bar /> -->
    <play-bar />
  </div>
</template>

<script>
// 组件
import AplayerBar from 'components/content/aplayerBar/AplayerBar.vue'
import HomeHeader from './childComp/homeHeader/HomeHeader.vue'
import HomeMain from './childComp/homeMain/HomeMain.vue'

import PlayBar from 'components/common/playBar/PlayBar.vue'
// 其它

export default {
  components: {
    HomeHeader,
    HomeMain,
    AplayerBar,
    PlayBar
  }
}
</script>

<style lang="less" scoped>
.home {
  // padding-bottom: 80px;
}

.el-container {
  width: var(--width-main);
  margin: 0 auto;
}

.el-footer {
  background-color: gray;
}
</style>