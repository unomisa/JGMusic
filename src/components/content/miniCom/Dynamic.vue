<template>
  <el-divider content-position="right">
    <div class="btn">
      <el-button type="primary" round size="default">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        播放全部
      </el-button>

      <el-button plain round @click="sub">
        <i class="el-icon-folder-add"></i>
        收藏({{dynamic.subCount}})
      </el-button>

      <el-button plain round @click="share">
        <i class="el-icon-share"></i>
        分享({{dynamic.shareCount}})
      </el-button>
    </div>
  </el-divider>
</template>

<script>
export default {
  props: {
    dynamic: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    sub () {
      this.$emit('sub')
    },
    share () {
      this.$emit('share')
    }
  }
}
</script>

<style lang="less" scoped>
</style>