<template>
  <div>
    <div class="loading" v-show="loading">
      <i class="el-icon-loading loading-icon"></i>
      <span>载入中...</span>
    </div>
    <div v-show="!loading && !empty">
      <slot></slot>
    </div>
    <div class="loading" v-show="!loading && empty">
      <slot name="empty"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    empty: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.loading {
  margin: 2rem 0;
  font-size: 18px;
  text-align: center;

  &-icon {
    margin-right: 10px;
  }
}
</style>