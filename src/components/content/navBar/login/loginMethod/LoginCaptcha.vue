<template>
  <div>
    <div class="input">
      <div class="input-row">
        <span class="input-text">手机号</span>
        <el-input class="input-login" type="text" :value="phone"
                  placeholder="手机号" maxlength="11" v-model='phone' />
      </div>

      <div class="input-row">
        <span class="input-text">短信验证码</span>
        <el-input class="input-login" :value="captcha" placeholder="短信验证码"
                  v-model='captcha' />
        <el-button type="success" @click="sendCaptcha"
                   :disabled="!sendCaptchaBtn">{{captchaBtText}}
        </el-button>
      </div>
    </div>

    <div class="login">
      <el-button class="login-btn" type="primary" size="default"
                 @click="phoneLogin">
        登录
      </el-button>
    </div>
  </div>
</template>

<script>
import { sendCaptcha, phoneLogin } from 'network/common/login'
import { updateLoginStatus } from 'common/mixin'

export default {
  mixins: [updateLoginStatus],
  data () {
    return {
      phone: '',
      captcha: '',
      captchaBtText: '发送验证码',
      sendCaptchaBtn: true
    }
  },
  methods: {
    // 发送验证码
    sendCaptcha () {
      sendCaptcha(this.phone).then(res => {
        console.log(res)
        if (res.code === 200) {
          let time = 60
          let timer = null
          this.sendCaptchaBtn = false

          timer = setInterval(() => {
            if (time > 1) {
              time--
              this.captchaBtText = `重新发送(${time})`
            } else {
              clearInterval(timer)
              this.sendCaptchaBtn = true
              this.captchaBtText = '发送验证码'
            }
          }, 1000)
        } else {
          this.$notify.topleft(res.message, 'error')
        }
      })
    },

    phoneLogin () {
      if (this.captcha.length === 0) {
        this.$notify.topleft('请输入验证码', 'warning')
      } else {
        phoneLogin(this.phone, this.captcha).then(res => {
          console.log('短信登陆后：', res)
          if (res && res.code === 200) {
            this.getLoginStatus() // > mixin中setLoginStatus的方法
            this.$notify.topleft('登录成功')
          } else {
            this.$notify.topleft('验证码错误', 'error')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  margin-top: 40px;

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
    height: 60px;
    border-bottom: 0.5px solid #ebedf0;
  }

  &-text {
    width: 110px;
  }
}

.login {
  margin-top: 40px;
  text-align: center;
}

.login-btn {
  height: 40px;
  width: 80%;
}
</style>
