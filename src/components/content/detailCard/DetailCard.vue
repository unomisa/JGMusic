<template>
  <el-card class="card" :body-style="cardBodyStyle">
    <detail-skeleton :loading="loading">
      <slot name="all"></slot>
      <div class="content">
        <div class="content-left">
          <slot name="left"></slot>
        </div>
        <div class="content-right">
          <slot name="right"></slot>
        </div>
      </div>
    </detail-skeleton>
  </el-card>
</template>

<script>
import DetailSkeleton from './detailSkeleton/DetailSkeleton.vue'
export default {
  components: { DetailSkeleton },
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cardBodyStyle () {
      return {
        height: 'inherit',
        'box-sizing': 'border-box'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  position: relative;
  margin-top: 50px;
  margin-bottom: 2rem;
  // height: 230px;  // 不能设置固定高度，否则无法展开隐藏文字
}

.content {
  display: flex;
  height: 100%;

  &-left {
    position: relative;
    width: 0;
    flex: 1;
  }

  &-right {
    position: relative;
    width: 0;
    flex: 4;
  }
}
</style>