<template>
  <context v-bind="$attrs" v-on="$listeners">
    <context-item @click.native="delComment">
      <template v-slot:icon>
        <i class="el-icon-delete"></i>
      </template>
      删除评论
    </context-item>
  </context>
</template>

<script>
import Context from 'components/common/context/Context.vue'
import ContextItem from 'components/common/context/Context-Item.vue'
import { commentHandle } from 'network/common'

export default {
  components: { Context, ContextItem },
  props: {
    comment: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    delComment () {
      console.log('删除评论')
      commentHandle(0, this.comment.type, this.comment.rid, '', this.comment.commentId).then(res => {
        console.log('删除结果为：', res)
        if (res.code === 200) {
          this.$notify.topleft('成功删除评论')
          this.$bus.$emit('addComment', false, this.index)
        } else {
          this.$notify.topleft(res.message, 'error')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>