<template>
  <div class="container">
    <el-card class="userDetail-card">
      <user-profile-skeleton style="width:100%">
        <div class="card-body">
          <div class="card-left">
            <el-image v-if="Object.keys(profile).length>0" class="avatar"
                      :src="profile.avatarUrl + '?param=300y300'" fit="contain"
                      :lazy="true">
              <div slot="error" class="avatar-error">
                <i class="el-icon-user user-icon"></i>
              </div>
            </el-image>
          </div>
          <div class="card-right">
            <div class="nickname">{{profile.nickname}}</div>

            <div class="other">
              <span class="level">Lv{{profile.level}}</span>
              <span class="gender">
                <svg class="icon" aria-hidden="true" v-if="profile.gender===1">
                  <use xlink:href="#icon-nan"></use>
                </svg>

                <svg class="icon" aria-hidden="true" v-if="profile.gender!==1">
                  <use xlink:href="#icon-nv"></use>
                </svg>
              </span>
              <div class="edit" v-if="isLoginUser">
                <el-button type="primary" icon="el-icon-edit" @click="editInfo">
                  编辑个人信息
                </el-button>
              </div>
            </div>

            <el-divider class="divider" v-if="isLoginUser">
              <i style="font-size:1.5rem" class="el-icon-folder"></i>
            </el-divider>

            <el-divider content-position="right" v-if="!isLoginUser">
              <div class="btn">
                <el-button plain round @click="followUser">
                  <i class="el-icon-plus" v-show="!isFollow"></i>
                  <i class="el-icon-check" v-show="isFollow"></i>
                  {{followText}}
                </el-button>

                <el-button plain round @click="sendMessage">
                  <i class="el-icon-message"></i>
                  发送私信
                </el-button>
              </div>
            </el-divider>

            <div class="relationship">
              <div class="relationship-text">
                <div class="relationship-number">{{profile.follows}}</div>
                <div>关注</div>
              </div>
              <el-divider class="divider-vertical" direction="vertical">
              </el-divider>
              <div class="relationship-text">
                <div class="relationship-number">{{profile.followeds}}</div>
                <div>粉丝</div>
              </div>
            </div>

            <div>
              个人介绍：
              <span class="signature-content"
                    v-if="profile.signature!==''">{{profile.signature}}</span>
              <span v-if=" profile.signature===''">暂无介绍</span>
            </div>
          </div>
        </div>
      </user-profile-skeleton>
    </el-card>
  </div>
</template>

<script>
import UserProfileSkeleton from '../skeleton/UserProfileSkeleton.vue'

import { mapState, mapMutations } from 'vuex'
import { followUser } from 'network/common'
import { Follow } from 'network/pageRequest/user'

export default {
  components: { UserProfileSkeleton },
  props: {
    profile: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ]),

    isLoginUser () {
      const id = parseInt(this.$route.params.userId)
      return this.loginUser.userId === id
    },

    isFollow () {
      const userId = parseInt(this.$route.params.userId)
      if ('followList' in this.loginUser) {
        return this.loginUser.followList.has(userId)
      } else {
        return false
      }
    },

    followText () {
      if (this.isFollow) {
        return '已关注'
      } else {
        return '关注'
      }
    }
  },
  methods: {
    ...mapMutations([
      'pushFollowList',
      'userUnfollow'
    ]),

    editInfo () {
      console.log('点击')
      this.$notify.info({
        position: 'top-left',
        title: '等待开发',
        message: '这是一个等待开发的组件',
        offset: 90
      })
    },

    // 关注/取消用户
    followUser () {
      const uid = parseInt(this.$route.params.userId)
      // console.log('用户为：', this.profile)
      if (this.isFollow) {
        followUser(uid, 0, Date.now()).then(res => {
          if (res.code === 200) {
            console.log('取消关注：', res)
            this.userUnfollow(uid)
            this.$notify({
              position: 'top-left',
              title: '已关注',
              offset: 90,
              type: 'success',
              duration: 2000
            })
          }
        })
      } else {
        followUser(uid, 1, Date.now()).then(res => {
          if (res.code === 200) {
            console.log('关注：', res)
            this.pushFollowList({
              key: uid,
              value: new Follow(this.profile)
            })
            this.$notify({
              position: 'top-left',
              title: '已取消关注',
              offset: 90,
              type: 'success',
              duration: 2000
            })
          }
        })
      }
    },

    sendMessage () {
      this.$notify.info({
        position: 'top-left',
        title: '等待开发',
        message: '这是一个等待开发的组件',
        offset: 90
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: var(--width-main);
  margin: 0 auto;
}

.userDetail-card {
  margin-top: 50px;
  height: 230px;
}

.card {
  &-body {
    display: flex;
  }

  &-left {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0;
    flex: 1;
  }

  &-right {
    width: 0;
    flex: 4;
    line-height: 1.5;
  }
}

.avatar {
  height: 190px;
  width: 190px;
  border-radius: 100%;
}

.nickname {
  font-size: 20px;
  font-weight: bold;
}

.other {
  position: relative;
}

.edit {
  position: absolute;
  right: 0;
  bottom: 0;
}

.level {
  border-radius: 20px;
  background-color: #f0f0f0;
  padding: 0 8px;
}

.gender {
  margin-left: 10px;
  font-size: 20px;
}

.divider {
  margin: 16px 0;

  &-vertical {
    height: initial;
    margin: 0 40px;
  }
}

.relationship {
  display: flex;
  margin: 16px 0;

  &-text {
    text-align: center;
    color: #606266;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: black;
    }
  }

  &-number {
    font-size: 18px;
    font-weight: bold;
  }
}

.signature {
  &-content {
    color: #676767;
  }
}
</style>

<style lang="less">
.userDetail-card .el-card__body {
  box-sizing: border-box;
  height: inherit;
  display: flex;
}

.avatar-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f5f7fa;
  border-radius: 100%;
  font-size: 50px;
  color: gray;
}
</style>