<template>
  <div class="container">
    <div class="content">
      <user-sub-type />
      <router-view />
    </div>
  </div>
</template>

<script>
import UserSubType from './childComp/UserSubType.vue'

export default {
  name: 'UserSub',
  components: { UserSubType }
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