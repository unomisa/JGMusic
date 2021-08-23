<template>
  <div class="qr">
    <div class="wait" v-if="statusCode===801">
      <div class="title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-code"></use>
        </svg>
        扫码登录
      </div>
      <el-image :src="qrBase64" fit="fill" />
      <div style="font-size:14px">
        请使用
        <span style="color:var(--color-main)">网易云APP</span>
        扫一扫
      </div>
    </div>
    <div class="wait-accredit" v-if="statusCode===802">
      <svg class="icon scan-success" aria-hidden="true">
        <use xlink:href="#icon-saomiaochenggong-copy"></use>
      </svg>
      <div class="scan-success-text">扫描成功，请在手机上授权登录</div>
    </div>
  </div>
</template>

<script>
import { getQRImg } from 'network/common/login'

export default {
  props: {
    qrkey: {
      type: String,
      default: ''
    },
    statusCode: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      qrBase64: ''
    }
  },
  watch: {
    qrkey (newKey) {
      getQRImg(newKey, 1, Date.now()).then(res => {
        if (res.code === 200) {
          this.qrBase64 = res.data.qrimg
        }
      })
    },
    statusCode (code) {
      console.log('新的状态码为:', code)
    }
  }
}
</script>

<style lang="less" scoped>
.qr {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
}

.wait {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  &-accredit {
    text-align: center;
  }
}

.title {
  font-size: 24px;
  margin-bottom: 0.5rem;
}

.scan-success {
  margin: 0 auto;
  width: 180px;
  height: 180px;

  &-text {
    margin-top: 1rem;
    text-align: center;
    font-size: 18px;
  }
}
</style>