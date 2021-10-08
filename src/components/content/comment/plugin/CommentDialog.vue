<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="30%" :modal="false"
               top="30vh" :before-close="handleClose">
      <template v-slot:title>
        <div class="title">发表评论</div>
      </template>
      <form v-on:submit.prevent="comment">
        <el-input class="content-input" type="textarea"
                  :placeholder="placeholder" v-model="content" :rows="4"
                  resize="none" maxlength="140" show-word-limit
                  ref="contentInput" @keydown.native="enter">
        </el-input>

        <div class="send">
          <el-button class="send-btn" type="primary" size="small"
                     native-type="submit" round>评论
          </el-button>
        </div>
      </form>
    </el-dialog>
  </div>
</template>

<script>
import { commentHandle, UserComment } from 'network/common'

export default {
  data () {
    return {
      dialogVisible: false,
      commentId: 0,
      reply: false,
      replyComment: {},
      sendType: 1,
      type: 0,
      rid: 0,
      content: '',
      placeholder: '发表评论'
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
      this.reset()
    },

    reset () {
      this.commentId = 0
      this.reply = false
      this.replyComment = {}
      this.sendType = 1
      this.type = 0
      this.rid = 0
      this.content = ''
      this.placeholder = '发表评论'
    },

    init ({ dialogVisible = true, sendType = 1, reply = false, replyComment = {}, type, rid, commentId, placeholder = '发表评论', content = '' }) {
      this.dialogVisible = dialogVisible
      this.sendType = sendType
      this.reply = reply
      this.replyComment = replyComment
      this.type = type
      this.rid = rid
      this.commentId = commentId
      this.placeholder = placeholder
      this.content = content

      this.$nextTick(() => {
        this.$refs.contentInput && this.$refs.contentInput.focus() // 输入框获取焦点
      })
    },

    comment () {
      if (this.reply) {
        this.sendReplyComment(this.rid, this.type, this.replyComment)
      } else {
        this.sendComment(this.rid, this.type)
      }
    },

    enter (event) {
      if (event.keyCode === 13 && !event.shiftKey) { // 若按键为回车且没有shfit则提交
        event.preventDefault()
        this.comment()
      }
    },

    // * 网络请求
    sendComment (rid, type) {
      commentHandle(this.sendType, this.type, this.rid, this.content).then(res => {
        console.log('评论后结果：', res)
        if (res.code === 200) {
          this.$notify.topleft('评论成功')
          this.$bus.$emit('addComment', new UserComment(res.comment, rid, type))
        } else if (res.code === 250) {
          this.$notify.topleft(res.data.dialog.subtitle, 'warning')
        } else {
          this.$notify.topleft(res.message, 'error')
        }
      })
      this.handleClose()
    },

    sendReplyComment (rid, type, replyComment) {
      commentHandle(this.sendType, this.type, this.rid, this.content, this.commentId).then(res => {
        console.log('回复后结果为：', res)
        if (res.code === 200) {
          this.$notify.topleft('回复评论成功')
          this.$bus.$emit('addComment', new UserComment({
            ...res.comment,
            beReplied: [
              {
                user: {
                  nickname: replyComment.nickname,
                  userId: replyComment.userId
                },
                content: replyComment.content
              }
            ]
          }, rid, type))
        } else {
          if (res && res.message) {
            this.$notify.topleft(res.message, 'error')
          } else {
            this.$notify.topleft('回复评论失败')
          }
        }
      })
      this.handleClose()
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.content-input {
  margin-bottom: 1rem;
}

.send {
  text-align: right;
}
</style>