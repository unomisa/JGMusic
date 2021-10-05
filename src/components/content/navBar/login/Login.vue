<template>
  <div class="login">
    <el-button plain @click="dialogVisible = true">
      登录 / 注册</el-button>
    <el-dialog class="login-dialog" title="提示" :visible.sync="dialogVisible"
               width="25%" :modal="false" :append-to-body="true"
               :before-close="handleClose">
      <template v-slot:title>
        <el-tabs class="login-tabs" v-model="activeName"
                 @tab-click="handleClick">

          <el-tab-pane label="验证码登录" name="captcha">
            <login-captcha :dialogVisible="dialogVisible"
                           :activeName="activeName" />
          </el-tab-pane>

          <!-- <el-tab-pane label="密码登录" name="password"></el-tab-pane> -->

          <el-tab-pane label="二维码登录" name="QRcode">
            <login-q-r-code :qrkey="qrkey" :statusCode="statusCode" />
          </el-tab-pane>

          <el-tab-pane label="注册" name="rigist">
            <regist :dialogVisible="dialogVisible" :activeName="activeName" />
          </el-tab-pane>
        </el-tabs>
      </template>

    </el-dialog>
  </div>
</template>

<script>
import LoginCaptcha from './loginMethod/LoginCaptcha.vue'
import LoginQRCode from './loginMethod/LoginQRCode.vue'

import { getQRKey, getQRCodeStatus } from 'network/common/login'
import { updateLoginStatus } from 'common/mixin'
import Regist from '../regist/regist.vue'

export default {
  mixins: [updateLoginStatus],
  components: { LoginCaptcha, LoginQRCode, Regist },
  data () {
    return {
      dialogVisible: false,
      activeName: 'captcha',
      timer: null,
      statusCode: 0,
      qrkey: ''
    }
  },
  methods: {
    // dialog 关闭前的回调
    handleClose () {
      this.dialogVisible = false
    },
    handleClick (tab, event) {
      if (this.activeName === 'QRcode') {
        this.getQRKey()
      } else {
        clearInterval(this.timer)
      }
    },

    // 轮询二维码状态
    pollingQRStatus () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        getQRCodeStatus(this.qrkey, Date.now()).then(res => {
          console.log('状态为:', res)
          if (res.code === 803) {
            this.handleClose() // 关闭登录窗口
            this.getLoginStatus() // > mixin中setLoginStatus的方法
            this.$notify.topleft('登录成功')
          }
          this.statusCode = res.code
        })
      }, 500)
    },

    getQRKey () {
      getQRKey(Date.now()).then(res => {
        if (res.code === 200) {
          this.qrkey = res.data.unikey
          this.pollingQRStatus()
        }
      })
    }
  },
  watch: {
    dialogVisible (newValue) {
      if (newValue === false) {
        // 停止轮询
        clearInterval(this.timer)
      } else {
        if (this.qrkey !== '') {
          this.pollingQRStatus()
        }
      }
    },
    statusCode (code) {
      if (code === 800) {
        clearInterval(this.timer)
        this.getQRKey()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  &-tabs {
    height: 400px;
  }

  &-dialog .el-dialog__body {
    padding: 0;
  }
}

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

<style lang="less">
.login-tabs {
  & .el-tabs__nav-wrap::after {
    content: none;
  }
}

.input {
  &-login {
    & > input {
      border: none;
    }
  }
}

.login-dialog .el-dialog__body {
  padding: 0;
}
</style>