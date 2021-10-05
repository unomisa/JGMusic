<template>
  <div class="container">
    <div class="content">
      <search-type />
      <router-view />
    </div>
  </div>
</template>

<script>
import searchType from './childComp/searchType.vue'

export default {
  components: { searchType }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  overflow: hidden;
}

.content {
  position: relative;
  width: var(--width-main);
  margin: 0 auto;
}
</style>