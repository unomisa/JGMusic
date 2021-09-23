<template>
  <div>
    <div class="input">
      <div class="input-row">
        <span class="input-text">用户名</span>
        <el-input class="input-login" type="text" placeholder="用户名"
                  v-model='nickname' />
      </div>

      <div class="input-row">
        <span class="input-text">手机号</span>
        <el-input class="input-login" type="text" placeholder="手机号"
                  maxlength="11" v-model='phone' />
      </div>

      <div class="input-row">
        <span class="input-text">密码</span>
        <el-input class="input-login" type="password" placeholder="密码"
                  v-model='password' />
      </div>

      <div class="input-row">
        <span class="input-text">短信验证码</span>
        <el-input class="input-login" placeholder="短信验证码" v-model='captcha' />
        <el-button type="success" @click="sendCaptcha"
                   :disabled="!sendCaptchaBtn">{{captchaBtText}}
        </el-button>
      </div>
    </div>

    <div class="login">
      <el-button class="login-btn" type="primary" size="default"
                 @click="register">
        注册
      </el-button>
    </div>
  </div>
</template>

<script>
import { phoneExistence, register, sendCaptcha } from 'network/common/login'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      nickname: '',
      phone: '',
      password: '',
      captcha: '',
      captchaBtText: '发送验证码',
      sendCaptchaBtn: true
    }
  },
  methods: {
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

    register () {
      phoneExistence(this.phone).then(res => {
        console.log('是否存在', res)
        if (res.code === 200) {
          if (res.exist === -1) {
            register(this.phone, this.password, this.captcha, this.nickname).then(res => {
              console.log('注册结果为', res)
              if (res.code === 200) {
                this.$notify.topleft('注册成功')
              } else {
                this.$notify.topleft(res.message, 'error')
              }
            })
          } else {
            this.$notify.topleft('用户已经注册', 'error')
          }
        }
      })
    },

    reset () {
      this.nickname = ''
      this.phone = ''
      this.password = ''
      this.captcha = ''
    }
  },
  watch: {
    dialogVisible (visible) {
      if (!visible) {
        this.reset()
      }
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