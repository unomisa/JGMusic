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
        <i class="el-icon-folder-add" v-show="!isSub"></i>
        <i class="el-icon-folder-checked" v-show="isSub"></i>
        {{subText}}({{formatPlayCount(dynamic.subCount,10000)}})
      </el-button>

      <!-- <el-button plain round @click="share">
        <i class="el-icon-share"></i>
        分享({{formatPlayCount(dynamic.shareCount,10000)}})
      </el-button> -->
    </div>
  </el-divider>
</template>

<script>
import { mapState } from 'vuex'
import { formatPlayCount } from 'common/utils'

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
    isSub: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ]),

    subText () {
      if (this.isSub) {
        return '已收藏'
      } else {
        return '收藏'
      }
    }
  },
  methods: {
    formatPlayCount (count, threshold) {
      return formatPlayCount(count, threshold)
    },

    // 播放全部
    playAll () {
      this.$bus.$emit('playAll', 0)
    },
    sub () {
      if (this.isLogin) {
        this.$emit('sub')
      } else {
        this.$notify.topleft('请先登录', 'warning')
      }
    },
    share () {
      if (this.isLogin) {
        this.$emit('share')
      } else {
        this.$notify.topleft('请先登录', 'warning')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>