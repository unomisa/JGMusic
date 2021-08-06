<template>
  <div class="user-comment">
    <el-avatar shape="circle" :src="comment.avatarUrl + '?param=50y50'"
               fit="fill" />
    <div class="comment">
      <div class="content">
        <el-link :underline="false" href="">
          {{comment.nickname}}</el-link>
        ：{{comment.content}}
      </div>

      <div class="reply" v-if="Object.keys(comment.replied).length>0">
        <el-link :underline="false" href="">
          @{{comment.replied.nickname}}</el-link>
        ：{{comment.replied.content}}
      </div>

      <div class="info">
        <span class="date">{{publishedDate}}</span>
        <span class="other">
          <svg class="icon other-icon" aria-hidden="true">
            <use xlink:href="#icon-dianzan"></use>
          </svg>
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
import { formatDate } from '../../../common/utils'

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
  }
}
</script>

<style lang="less" scoped>
.user-comment {
  display: flex;
}

.comment {
  display: flex;
  flex-direction: column;
  justify-content: center;
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

.el-avatar {
  margin-right: 1rem;
  height: 50px;
  width: 50px;
  cursor: pointer;
}

.el-link {
  color: #527fb0;
  vertical-align: initial;
  &:hover {
    color: #7c83fd;
  }
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
</style>