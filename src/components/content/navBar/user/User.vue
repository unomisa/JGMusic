<template>
  <div class="user">
    <div class="user-base">
      <el-avatar class="user-avatar" :size="50" shape="circle"
                 :src="loginUser.avatarUrl +'?param=50y50'"
                 @click.native="goUserDetail" />
      <el-dropdown trigger="click">
        <div class="user-text">
          <span class="user-name">{{loginUser.nickname}}</span>
          <i class="el-icon-caret-bottom "></i>
        </div>
        <el-dropdown-menu class="dropdown-menu" slot="dropdown">
          <el-dropdown-item class="relation">
            <div class="follows">
              <div class="follows-number">{{loginUser.follows}}</div>
              <div class="follows-text">关注</div>
            </div>
            <div class="follows">
              <div class="follows-number">{{loginUser.followeds}}</div>
              <div class="follows-text">粉丝</div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided icon="el-icon-switch-button"
                            @click.native="loginOut">退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { logOut } from 'network/common/login'

export default {
  computed: {
    ...mapState([
      'loginUser'
    ])
  },
  methods: {
    ...mapMutations([
      'setIsLogin'
    ]),

    loginOut () {
      logOut(Date.now())
      this.$notify({
        position: 'top-left',
        title: '退出登录',
        offset: 90,
        type: 'success'
      })
      this.setIsLogin(false)
    },

    // 跳转用户详情
    goUserDetail () {
      if (this.$route.path !== `/userDetail/${this.loginUser.userId}`) {
        this.$router.push({
          path: `/userDetail/${this.loginUser.userId}`
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  &-base {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &-avatar {
    margin-right: 1rem;
    cursor: pointer;
  }

  &-text {
    color: #f0f0f0;
    cursor: pointer;

    &:hover {
      color: white;
    }
  }

  &-name {
    margin-right: 5px;
  }
}

.dropdown-menu {
  width: 250px;
  top: 68px !important;
}

.relation {
  display: flex;
  align-items: center;
  text-align: center;
  line-height: initial;

  &:hover {
    background-color: initial !important;
    color: #606266 !important;
  }
}

.follows {
  width: 0;
  flex: 1;
  color: var(--color-gray);

  &:hover {
    color: black;
  }

  &-number {
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  &-text {
  }
}
</style>