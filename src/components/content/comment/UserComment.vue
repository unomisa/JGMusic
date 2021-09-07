<template>
  <div class="user-comment">
    <div class="left">
      <el-avatar class="avatar" shape="circle"
                 :src="comment.avatarUrl + '?param=50y50'" fit="fill"
                 @click.native="goUserDetail" />
      <span v-if="comment.authStatus===1">
        <el-avatar class="author-icon" shape="circle"
                   src="http://p3.music.126.net/tBTNafgjNnTL1KlZMt7lVA==/18885211718935735.jpg?param=20y20"
                   fit="fill" />
      </span>
    </div>

    <div class="comment">
      <div class="content">
        <el-link :underline="false" @click="goUserDetail">
          {{comment.nickname}}</el-link>
        ：{{comment.content}}
      </div>

      <div class="reply" v-if="Object.keys(comment.replied).length>0">
        <el-link :underline="false" @click="goUserDetail">
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
          <svg class="icon other-icon" aria-hidden="true">
            <use xlink:href="#icon-pinglun"></use>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'common/utils'
import { likeComment } from 'network/common'

export default {
  props: {
    comment: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
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
    goUserDetail () {
      this.$router.push('/userDetail/' + this.comment.userId)
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