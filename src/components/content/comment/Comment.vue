<template>
  <div>
    <write-comment-area :type="type" :rid="rid" v-if="!singleWC" />

    <comment-skeleton :loading="loading">
      <div class="container" ref="container">

        <div v-if="newComments.length > 0">
          <div v-show="hotComments.length>0 && isShowHot">
            <div class="title">
              云村评论
              <span>({{total}})</span>
            </div>
            <div class="comments">
              <div class="comment" v-for="comment in hotComments"
                   :key="comment.commentId">
                <user-comment :comment="comment" @like="like(comment)"
                              @unLike="unLike(comment)" />
                <el-divider />
              </div>
            </div>
          </div>

          <div v-if=" newComments.length>0">
            <div class="title">最新评论
              <span>({{total}})</span>
            </div>
            <div class="comments">
              <div class="comment" v-for="(comment,index) in newComments"
                   :key="comment.commentId">
                <user-comment :comment="comment" @like="like(comment)"
                              :index="index" @unLike="unLike(comment)" />
                <el-divider />
              </div>
            </div>
          </div>

          <el-pagination background layout="prev, pager, next" :total="total"
                         :page-size="20" :pager-count="9"
                         @current-change="pageChange" />
          <br>
        </div>

        <div v-if="newComments.length === 0">
          <h3 class="tips">还没有评论，快来抢沙发~</h3>
        </div>

        <write-comment :type="type" :rid="rid" v-if="singleWC" />

      </div>
    </comment-skeleton>
  </div>

</template>

<script>
import CommentSkeleton from './skeleton/CommentSkeleton.vue'
import UserComment from './UserComment.vue'
import WriteComment from './writeComment.vue'
import WriteCommentArea from './WriteCommentArea.vue'

export default {
  components: { UserComment, CommentSkeleton, WriteComment, WriteCommentArea },
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
    total: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: true
    },
    type: {
      type: Number,
      default: 0
    },
    rid: {
      type: Number,
      default: 0
    },
    singleWC: {
      type: Boolean,
      default: false
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
      this.$emit('pageChange', page) // > 注意页码改变会发出事件
      this.$refs.container.scrollIntoView(true)
    },

    unLike (comment) {
      comment.liked = false
      comment.likedCount--
    },

    like (comment) {
      comment.liked = true
      comment.likedCount++
    },

    addComment (comment, index) {
      if (comment) { // 若传递过来的为一个对象，则直接添加至顶
        this.newComments.unshift(comment)
      } else { // 否则删除下标位置的评论
        this.newComments.splice(index, 1)
      }
    }
  },
  mounted () {
    this.$bus.$on('addComment', this.addComment)
  },
  deactivated () {
    this.$bus.$off('addComment', this.addComment)
  },
  destroyed () {
    this.$bus.$off('addComment', this.addComment)
  }
}
</script>

<style lang="less" scoped>
.container {
  // margin-top: 24px;
}

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

.tips {
  text-align: center;
}
</style>