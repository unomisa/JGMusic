<template>
  <el-divider content-position="right">
    <div class="btn">
      <el-button type="primary" round size="default" @click="playAll">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        播放全部
      </el-button>

      <el-button plain round @click="sub" :disabled="isMyList">
        <i class="el-icon-folder-add" v-show="!isSubList"></i>
        <i class="el-icon-folder-checked" v-show="isSubList"></i>
        {{subText}}({{dynamic.subCount}})
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
    },
    isMyList: {
      type: Boolean,
      default: false
    },
    isSubList: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    subText () {
      if (this.isSubList) {
        return '已收藏'
      } else {
        return '收藏'
      }
    }
  },
  methods: {
    // 播放全部
    playAll () {
      this.$bus.$emit('playAll', 0)
    },
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