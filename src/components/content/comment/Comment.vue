<template>
  <div class="container" ref="container">
    <div v-if="total!==0">
      <div v-show="hotComments.length>0 && isShowHot">
        <div class="title">云村评论({{total}})</div>
        <div class="comments">
          <div class="comment" v-for="comment in hotComments"
               :key="comment.commentId">
            <user-comment :comment="comment" />
            <el-divider />
          </div>
        </div>
      </div>

      <div v-if="newComments.length>0">
        <div class="title">最新评论({{total}})</div>
        <div class="comments">
          <div class="comment" v-for="comment in newComments"
               :key="comment.commentId">
            <user-comment :comment="comment" />
            <el-divider />
          </div>
        </div>
      </div>

      <el-pagination background layout="prev, pager, next" :total="total"
                     :page-size="20" :pager-count="9"
                     @current-change="pageChange" />
      <br>
    </div>

    <div v-if="total===0">
      <h3 class="tips">还没有评论，快来抢沙发~</h3>
    </div>
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
    total: {
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
      this.$emit('pageChange', page) // > 注意页码改变会发出事件
      this.$refs.container.scrollIntoView(true)
    }
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