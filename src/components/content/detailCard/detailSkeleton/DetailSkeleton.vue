<template>
  <el-skeleton class="skeleton" :loading="loading" :throttle="0" animated>
    <template v-slot:template>
      <div>
        <div class="skeleton-solt">
          <div class="skeleton-left">
            <el-skeleton-item variant="image" class="skeleton-image" />
          </div>
          <div class="skeleton-right  skeleton-items">
            <el-skeleton-item variant="p" style="width: 30%" />
            <el-skeleton-item variant="p" style="width: 100%" />
            <el-skeleton-item variant="p" style="width: 50%" />
            <el-skeleton-item variant="p" style="width: 70%" />
          </div>
        </div>
      </div>
    </template>

    <template v-slot:default>
      <!-- ? 必须有个div嵌套在外，因为会使第一个元素类失效 -->
      <div style="height:100%;">
        <slot>
        </slot>
      </div>
    </template>
  </el-skeleton>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.skeleton {
  height: 100%;
  width: 100%;

  &-left {
    flex: 1;
  }

  &-right {
    flex: 4;
  }

  &-solt {
    display: flex;
    height: 100%;
  }

  &-items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }

  &-image {
    width: 190px;
    height: 190px;
  }
}
</style>