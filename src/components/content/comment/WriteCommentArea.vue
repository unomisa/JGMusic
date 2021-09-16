<template>
  <div>
    <el-input class="content-input" type="textarea" :placeholder="placeholder"
              v-model="content" :rows="4" resize="none" maxlength="140"
              show-word-limit @keydown.native="enter">
    </el-input>

    <div class="send">
      <el-button class="send-btn" type="primary" size="small"
                 @click="sendComment" round>评论
      </el-button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    type: {
      type: Number,
      default: 0
    },
    rid: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      content: '',
      placeholder: '请输入评论'
    }
  },
  methods: {
    reset () {
      this.content = ''
    },

    sendComment () {
      this.$comment.init({
        dialogVisible: false,
        type: this.type,
        rid: this.rid,
        content: this.content
      })
      this.$comment.comment()
      this.reset()
    },

    enter (event) {
      if (event.keyCode === 13 && !event.shiftKey) { // 若按键为回车且没有shfit则提交
        event.preventDefault()
        this.sendComment()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content-input {
  margin-bottom: 1rem;
}

.send {
  text-align: right;
}
</style>