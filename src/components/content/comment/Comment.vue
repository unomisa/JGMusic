<template>
  <div class="container" ref="container">
    <div v-show="hotComments.length>0 && isShowHot">
      <div class="title">云村评论({{totalCount}})</div>
      <div class="comments">
        <div class="comment" v-for="comment in hotComments"
             :key="comment.commentId">
          <user-comment :comment="comment" />
          <el-divider />
        </div>
      </div>
    </div>

    <div v-if="newComments.length>0">
      <div class="title">最新评论({{totalCount}})</div>
      <div class="comments">
        <div class="comment" v-for="comment in newComments"
             :key="comment.commentId">
          <user-comment :comment="comment" />
          <el-divider />
        </div>
      </div>
    </div>

    <el-pagination background layout="prev, pager, next" :total="totalCount"
                   :page-size="20" :pager-count="9"
                   @current-change="pageChange" />
    <br>
  </div>
</template>

<script>
import UserComment from './UserComment.vue'

export default {
  components: { UserComment },
  props: {
    hotComments: {
      type: Array,
      default () {
        return []
      }
    },
    newComments: {
      type: Array,
      default () {
        return []
      }
    },
    totalCount: {
      type: Number,
      default: 0
    }

  },
  data () {
    return {
      isShowHot: true
    }
  },
  methods: {
    // * 事件处理
    pageChange (page) {
      if (page !== 1) {
        this.isShowHot = false
      } else {
        this.isShowHot = true
      }
      this.$emit('pageChange', page)
      this.$refs.container.scrollIntoView(true)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  margin-bottom: 24px;
  font-weight: bold;
  font-size: 18px;
}

.comments {
  margin-bottom: 100px;

  &-hot {
  }
}

.comment {
  &:last-child > .el-divider {
    display: none;
  }
}

.el-pagination {
  text-align: center;
  margin-bottom: 30px;
  margin-top: -50px;
}
</style>