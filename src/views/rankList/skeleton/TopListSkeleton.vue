<template>
  <el-skeleton class="skeleton" :loading="loading" :throttle="0" animated>
    <template v-slot:template>
      <div class="lists">
        <div class="list" v-for="i in listCount" :key="i">
          <div class="list-left">
            <el-skeleton-item class="list-cover" variant="image" />
          </div>
          <div class="list-right">
            <el-skeleton-item class="list-song" variant="text" v-for="i in 5"
                              :key="i" />
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
import Song from '../../../components/content/songGroup/Song.vue'
export default {
  components: { Song },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    listCount: {
      type: Number,
      default: 4
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  margin-bottom: 80px;

  &-left {
    flex: 250px 0;
    height: 250px;
    position: relative;
    margin-right: 50px;
  }

  &-right {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &-cover {
    height: 250px;
    width: 250px;
    border-radius: 10px;
  }

  &-song {
    height: 40px;
  }
}
</style>