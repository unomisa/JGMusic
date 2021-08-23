<template>
  <div>
    <div class="input-row">
      <span class="input-text">手机号</span>
      <el-input class="input-login" type="text" :value="phone" placeholder="手机号"
                maxlength="11" @input="phoneChange" />
    </div>

    <div class="input-row">
      <span class="input-text">短信验证码</span>
      <el-input class="input-login" :value="captcha" placeholder="短信验证码"
                @input="captchaChange" />
      <el-button type="success" @click="sendCaptcha">发送验证码</el-button>
    </div>
  </div>
</template>

<script>
import { sendCaptcha } from 'network/common/login'

export default {
  props: {
    phone: {
      type: String,
      default: ''
    },
    captcha: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 发送验证码
    sendCaptcha () {
      sendCaptcha(this.phone).then(res => {
        console.log(res)
        if (res.code === 200) {
          console.log('短信发送成功')
        }
      })
    },

    phoneChange (value) {
      this.$emit('update:phone', value)
    },

    captchaChange (value) {
      this.$emit('update:captcha', value)
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  &-login {
    width: 0;
    flex: 1;

    & > input {
      border: none;
    }
  }

  &-row {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 0.5px solid #ebedf0;
  }

  &-text {
    width: 110px;
  }
}
</style>
