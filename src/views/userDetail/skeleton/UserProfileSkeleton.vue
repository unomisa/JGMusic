<template>
  <div>
    <el-skeleton class="skeleton" :loading="loading" :throttle="500" animated>
      <template v-slot:template>
        <div class="skeleton-solt">
          <div class="skeleton-left">
            <el-skeleton-item variant="image" class="skeleton-image" />
          </div>
          <div class="skeleton-right  skeleton-items">
            <el-skeleton-item variant="p" style="width: 30%" />
            <el-skeleton-item variant="p" style="width: 100%" />
            <el-skeleton-item variant="p" style="width: 80%" />
            <el-skeleton-item variant="p" style="width: 50%" />
          </div>
        </div>
      </template>

      <template v-slot:default>
        <div>
          <slot>
          </slot>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true
    }
  },
  methods: {
    setLoading (bool) {
      this.loading = bool
    }
  },
  created () {
    this.$bus.$on('userProfileLoading', this.setLoading)
  }
}
</script>

<style lang="less" scoped>
.skeleton {
  width: 100%;

  &-left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-right {
    flex: 4;
  }

  &-solt {
    display: flex;
  }

  &-items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 1rem;
    width: 100%;
  }

  &-image {
    width: 170px;
    height: 170px;
    border-radius: 100%;
  }
}
</style>