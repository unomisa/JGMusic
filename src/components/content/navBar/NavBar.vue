<template>
  <el-header class="herder">
    <el-row type="flex" align="middle">
      <el-col :span="4" :offset="0">
        <slot name="left">
          <div class="logo" @click="goHome">
            <el-image class="logo-image"
                      :src="require('assets/img/common/cloudmusic.svg')" />
            <div class="logo-title">网易云音乐</div>
          </div>
        </slot>
      </el-col>

      <el-col :span="16" :offset="0">
        <slot name="center"></slot>
      </el-col>

      <el-col :span="4">
        <slot name="right">
          <login />
        </slot>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import Login from 'components/content/login/Login.vue'

export default {
  components: { Login },
  methods: {
    goHome () {
      if (!this.$route.path.includes('/home')) {
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.herder {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-bar-height) !important;
  padding: 0 calc((100% - 1200px) / 2);
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(52, 52, 52, 10%);
}

.el-row {
  height: inherit;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;

  &-title {
    font-size: 24px;
  }

  &-image {
    width: 50px;
    height: 50px;
    padding-right: 0.5rem;
  }
}
</style>