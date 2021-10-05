<template>
  <div class="user-comment" @contextmenu.prevent="context">
    <div class="left">
      <el-avatar class="avatar" shape="circle"
                 :src="comment.avatarUrl + '?param=50y50'" fit="fill"
                 @click.native="goUserDetail(comment)" />
      <span v-if="comment.authStatus===1">
        <el-avatar class="author-icon" shape="circle"
                   :src="comment.avatarDetail.identityIconUrl + '?param=20y20'"
                   fit="fill" />
      </span>
    </div>

    <div class="comment">
      <div class="content">
        <el-link :underline="false" @click="goUserDetail(comment)">
          {{comment.nickname}}</el-link>
        ：{{comment.content}}
      </div>

      <div class="reply" v-if="Object.keys(comment.replied).length>0">
        <el-link :underline="false" @click="goUserDetail(comment.replied)">
          @{{comment.replied.nickname}}</el-link>
        ：{{comment.replied.content}}
      </div>

      <div class="info">
        <span class="date">{{publishedDate}}</span>
        <span class="other">

          <span @click="like">
            <svg class="icon other-icon" aria-hidden="true"
                 v-if="!comment.liked">
              <use xlink:href="#icon-dianzan"></use>
            </svg>

            <svg class="icon other-icon liked" aria-hidden="true"
                 v-if="comment.liked">
              <use xlink:href="#icon-dianzan1"></use>
            </svg>
          </span>

          {{comment.likedCount}}
          <el-divider direction="vertical"></el-divider>

          <span @click="reply">
            <svg class="icon other-icon" aria-hidden="true">
              <use xlink:href="#icon-pinglun"></use>
            </svg>
          </span>
        </span>
      </div>
    </div>

    <comment-context :showContext.sync="showContext" :x.sync="context_x"
                     :y.sync="context_y" :comment="comment" v-bind="$attrs"
                     v-if="showContext" />
  </div>
</template>

<script>
import { formatDate } from 'common/utils'
import { likeComment } from 'network/common'
import CommentContext from './CommentContext.vue'

import { mapState } from 'vuex'

export default {
  components: { CommentContext },
  props: {
    comment: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showContext: false,
      context_x: 0,
      context_y: 0
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ]),

    publishedDate () {
      const now = new Date()
      const createdDate = new Date(this.comment.time)
      let fmtDate = formatDate(new Date(this.comment.time)).slice(0, -3).split(' ')[1]
      if (createdDate.getFullYear() !== now.getFullYear()) {
        fmtDate = createdDate.getFullYear() + '年' + (createdDate.getMonth() + 1) + '月' + createdDate.getDate() + '日' + ' ' + fmtDate
      } else if (createdDate.getMonth() !== now.getMonth() || createdDate.getDate() !== now.getDate()) {
        fmtDate = (createdDate.getMonth() + 1) + '月' + createdDate.getDate() + '日' + ' ' + fmtDate
      }
      return fmtDate
    }
  },
  methods: {
    goUserDetail (comment) {
      this.$router.push('/user/detail/' + comment.userId)
    },

    like () {
      const comm = this.comment
      if (this.comment.liked) {
        likeComment(comm.rid, comm.commentId, 0, comm.type).then(res => {
          if (res.code === 200) {
            this.$emit('unLike')
            this.$notify.topleft('取消点赞')
          }
        })
      } else {
        likeComment(comm.rid, comm.commentId, 1, comm.type).then(res => {
          console.log('点赞后：', res)
          if (res.code === 200) {
            this.$emit('like')
            this.$notify.topleft('点赞成功')
          }
        })
      }
    },

    reply () {
      this.$comment.init({
        sendType: 2,
        reply: true,
        replyComment: this.comment,
        type: this.comment.type,
        rid: this.comment.rid,
        commentId: this.comment.commentId,
        placeholder: `回复@${this.comment.nickname}：`
      })
    },

    // 上下文菜单
    context (event) {
      if (this.comment.userId !== this.loginUser.userId) return // 判断是否是当前登录用户
      if (event.button === 2) { // 如果为右键
        this.showContext = true // 显示上下文菜单
        this.context_x = event.clientX // 传递点击位置
        this.context_y = event.clientY
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-comment {
  display: flex;
}

.left {
  position: relative;
  margin-right: 1rem;
}

.author-icon {
  position: absolute;
  right: 0;
  top: 35px;
  height: 16px;
  width: 16px;
}

.comment {
  display: flex;
  flex-direction: column;
  justify-content: center;
  word-break: break-all;
}

.comment {
  flex: 1;
  width: 0;
  font-size: 14px;
  line-height: 1.5;
  text-align: justify;
}

.date {
  color: #a0a0a0;
  font-size: 12px;
}

.avatar {
  height: 50px;
  width: 50px;
  cursor: pointer;
}

.reply {
  padding: 5px 8px;
  margin-top: 10px;
  font-size: 13px;
  border-radius: 5px;
  background-color: #f3f3f4;

  & > .el-link {
    font-size: 13px;
  }
}

.info {
  position: relative;
  margin-top: 10px;
  letter-spacing: 1px;
}

.other {
  position: absolute;
  right: 0;
  font-size: 14px;

  &-icon {
    font-size: 18px;
    cursor: pointer;
  }
}

.liked {
  color: var(--color-main);
}
</style>