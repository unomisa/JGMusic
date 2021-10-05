<template>
  <el-header class="herder">
    <div class="content">
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
          <slot name="center">

            <transition name="el-fade-in-linear">
              <div v-show="!$route.path.includes('/musicDetail')">
                <el-row type="flex" align="middle">
                  <el-col :span="12" :offset="1">
                    <el-menu style="border:none;" :default-active="activeIndex"
                             mode="horizontal" text-color="#f0f0f0"
                             active-text-color="white" :router="true"
                             background-color="#d83993" @select="handleSelect">
                      <el-menu-item index="/home">首页</el-menu-item>
                      <el-menu-item index="/rankList">排行</el-menu-item>
                      <el-menu-item index="/songList">歌单</el-menu-item>
                      <el-menu-item index="/artist">歌手</el-menu-item>
                      <!-- <el-menu-item index="5">MV</el-menu-item> -->
                    </el-menu>
                  </el-col>

                  <el-col :span="10" :offset="1">
                    <search />
                  </el-col>
                </el-row>
              </div>
            </transition>

            <transition name="el-fade-in-linear">
              <div v-if="$route.path.includes('/musicDetail')">
                <el-col :span="12" :offset="0">
                  <search class="detail-search-input" round />
                </el-col>
              </div>
            </transition>
          </slot>
        </el-col>

        <el-col :span="4" class="right">
          <slot name="right">
            <login v-if="!isLogin" />
            <user v-if="isLogin" />
          </slot>
        </el-col>
      </el-row>
    </div>
  </el-header>
</template>

<script>
import Login from 'components/content/navBar/login/Login.vue'
import User from './user/User.vue'
import search from './search/search.vue'

import { mapState } from 'vuex'
import { updateLoginStatus } from 'common/mixin'

export default {
  mixins: [updateLoginStatus],
  components: { Login, User, search },
  data () {
    return {
      activeIndex: ''

    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  methods: {
    handleSelect (index) {
      // console.log('index：', this.activeIndex)
      // this.activeIndex = index
    },

    goHome () {
      this.$router.push('/home')
    }
  },
  created () {
    this.getLoginStatus() // 创建时刷新用户状态
  },
  watch: {
    '$route.path' (toPath) {
      this.activeIndex = toPath // 根据当前路由来判断导航选项
    }
  }
}
</script>

<style lang="less" scoped>
.herder {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-bar-height) !important;
  background-color: var(--color-main);
  box-shadow: 0 2px 10px 0 rgba(52, 52, 52, 15%);
}

.content {
  margin: 0 auto;
  height: inherit;
  width: 1200px;
  transform: translateX(-9px);
}

.right {
  text-align: right;
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
    color: white;
  }

  &-image {
    width: 50px;
    height: 50px;
    padding-right: 0.5rem;
  }
}

.el-menu {
  height: inherit;
  width: 100%;

  &-item {
    font-size: var(--font-size-medium);

    &:hover {
      background-color: transparent !important;
      color: white !important;
    }
  }
}

.detail-search-input {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
}
</style>
