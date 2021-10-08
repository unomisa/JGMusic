<template>
  <span class="like">
    <svg class="icon like-icon" aria-hidden="true" v-if="!ifLike"
         @click.stop="like">
      <use xlink:href="#icon-aixin"></use>
    </svg>

    <svg class="icon like-icon" aria-hidden="true" v-if="ifLike"
         @click.stop="like">
      <use xlink:href="#icon-aixin1-copy"></use>
    </svg>
  </span>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { likeSong } from 'network/common'

export default {
  props: {
    id: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ]),

    ifLike () {
      if ('likeListSet' in this.loginUser) {
        return this.loginUser.likeListSet.has(this.id)
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations([
      'addLikeList',
      'delLikeList'
    ]),

    like () {
      likeSong(this.id, !this.ifLike).then(res => {
        console.log('喜欢后结果为：', res)
        if (res !== undefined && res.code === 200) {
          if (!this.ifLike) {
            this.addLikeList(this.id)
            this.$notify.topleft('已添加至我喜欢的音乐')
          } else {
            this.delLikeList(this.id)
            this.$notify.topleft('已取消喜欢')
          }
        } else {
          if (res && res.message) {
            this.$notify.topleft(res.message, 'error')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.like {
  &-icon {
    cursor: pointer;
    font-size: 18px;
  }
}
</style>