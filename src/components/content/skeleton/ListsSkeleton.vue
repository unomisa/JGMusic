<template>
  <el-skeleton class="skeleton" :loading="loading" :throttle="0" animated>
    <template v-slot:template>
      <div class="lists">
        <div class="list" v-for="i in listCount" :key="i">
          <el-skeleton-item class="list-image" variant="image" />
          <el-skeleton-item class="list-text" variant="text" />
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
    },
    listCount: {
      type: Number,
      default: 15
    }
  }
}
</script>

<style lang="less" scoped>
@listWidth: 200px;
.list {
  width: @listWidth;
  margin-right: calc((100% - (@listWidth * 5)) / 4);
  margin-bottom: 2rem;

  &:nth-child(5n) {
    margin: 0;
  }

  &s {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  &-image {
    border-radius: 5px;
    height: 200px;
    width: 200px;
  }

  &-text {
    margin: 0.5rem 0;
    width: 70%;
  }
}
</style>