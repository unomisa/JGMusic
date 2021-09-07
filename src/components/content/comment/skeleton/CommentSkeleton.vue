<template>
  <el-skeleton class="skeleton" :loading="loading" :throttle="0" animated>
    <template v-slot:template>
      <div class="title">云村评论</div>
      <div v-for="i in 10" :key="i">
        <div class="comment-user">
          <div class="comment-left">
            <el-skeleton-item class="avatar" variant="circle" />
          </div>
          <div class="comment-right">
            <el-skeleton-item class="item" variant="p" style="width: 100%" />
            <el-skeleton-item class="item" variant="p" style="width: 30%" />
          </div>
        </div>
        <el-divider />
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
.comment {
  &-user {
    display: flex;
  }

  &-left {
    // flex: 0;
  }

  &-right {
    flex: 1;
  }
}

.avatar {
  margin-right: 1rem;
  height: 50px;
  width: 50px;
}

.item {
  display: block;
  margin-bottom: 1.25rem;

  &:last-child {
    margin: 0;
  }
}

.title {
  margin-bottom: 24px;
  font-weight: bold;
  font-size: 18px;
}
</style>