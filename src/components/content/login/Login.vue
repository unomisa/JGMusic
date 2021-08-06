<template>
  <div class="login">
    <el-button style="float:right" plain @click="dialogVisible = true">
      登录 / 注册</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%"
               :modal="false" :append-to-body="true"
               :before-close="handleClose">
      <template v-slot:title>
        <el-tabs class="login-tabs" v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="手机登录" name="first">
            <div class="input-row">
              <span class="input-text">手机号</span>
              <el-input class="input-login" v-model="phone" placeholder="手机号">
              </el-input>
            </div>

            <div class="input-row">
              <span class="input-text">短信验证码</span>
              <el-input class="input-login" v-model="authCode"
                        placeholder="短信验证码">
              </el-input>
              <el-button type="success">
                发送验证码
              </el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="密码登录" name="second"></el-tab-pane>
          <el-tab-pane label="二维码登录" name="third"></el-tab-pane>
        </el-tabs>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">登 录
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      phone: '',
      authCode: ''
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
      console.log('关闭遮罩')
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
.login-tabs {
  height: 150px;
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
.login-tabs .el-tabs__nav-wrap::after {
  content: none;
}

.input {
  &-login {
    & > input {
      border: none;
    }
  }
}
</style>