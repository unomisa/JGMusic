<template>
  <detail-card :loading="profileLoading">
    <template v-slot:left>
      <el-image v-if="Object.keys(profile).length>0" class="avatar"
                :src="profile.avatarUrl + '?param=200y200'" fit="fill">
        <div slot="error" class="avatar-error">
          <i class="el-icon-user user-icon"></i>
        </div>
      </el-image>
    </template>
    <template v-slot:right>
      <div class="right">
        <div class="nickname">{{profile.nickname}}</div>

        <div class="other">
          <span class="level">Lv{{profile.level}}</span>

          <span class="gender">
            <svg class="icon" aria-hidden="true" v-if="profile.gender===1">
              <use xlink:href="#icon-nan"></use>
            </svg>

            <svg class="icon" aria-hidden="true" v-if="profile.gender === 2">
              <use xlink:href="#icon-nv"></use>
            </svg>
          </span>

          <span class="identify" v-if="profile.identify">
            <el-image class="identify-icon"
                      :src="profile.identify.imageUrl + '?param=20y20'"
                      fit="fill" />
            <span class="identify-desc">{{profile.identify.imageDesc}}</span>
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
              <i class="el-icon-sort mutual" v-if="profile.mutual"></i>
              <i class="el-icon-plus" v-show="!isFollow"></i>
              <i class="el-icon-check" v-show="!profile.mutual && isFollow"></i>
              {{followText}}
            </el-button>

            <el-button plain round @click="sendMessage">
              <i class="el-icon-message"></i>
              发送私信
            </el-button>
          </div>
        </el-divider>

        <div class="relationship">
          <div class="relationship-text" @click="followsDetail">
            <div class="relationship-number">{{profile.follows}}</div>
            <div>关注</div>
          </div>
          <el-divider class="divider-vertical" direction="vertical">
          </el-divider>
          <div class="relationship-text" @click="followedsDetail">
            <div class="relationship-number">{{profile.followeds}}</div>
            <div>粉丝</div>
          </div>
        </div>

        <collapsible-text>
          个人介绍：
          <span class="signature-content"
                v-if="profile.signature">{{profile.signature}}</span>
          <span v-if=" !profile.signature">暂无介绍</span>
        </collapsible-text>

      </div>
    </template>
  </detail-card>
</template>

<script>

import { mapState, mapMutations } from 'vuex'
import { followUser, User } from 'network/common'
import DetailCard from 'components/content/detailCard/DetailCard.vue'
import CollapsibleText from 'components/common/collapsibleText/collapsibleText.vue'

export default {
  components: { DetailCard, CollapsibleText },
  props: {
    profile: {
      type: Object,
      default () {
        return {}
      }
    },
    profileLoading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ]),

    uid () {
      return parseInt(this.$route.params.userId)
    },

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
      if (this.profile.mutual) {
        return '互相关注'
      } else if (this.isFollow) {
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
            // console.log('取消关注：', res)
            this.userUnfollow(uid)
            this.$notify.topleft('已取消关注')
            this.profile.followed = false
            this.profile.mutual = false
            this.profile.followeds = this.profile.followeds - 1 // 粉丝减一
          }
        })
      } else {
        followUser(uid, 1, Date.now()).then(res => {
          if (res.code === 200) {
            // console.log('关注：', res)
            this.pushFollowList({
              key: uid,
              value: new User({
                ...this.profile,
                followed: true
              })
            })
            this.$notify.topleft('已关注')
            this.profile.followed = res.user.followed // 根据返回设置
            this.profile.mutual = res.user.mutual // 根据返回设置
            this.profile.followeds = this.profile.followeds + 1 // 粉丝加一
          }
        })
      }
    },

    sendMessage () {
      this.$notify.wait()
    },

    followsDetail () {
      this.$router.push({
        path: '/user/follow/' + this.profile.userId,
        query: {
          type: 'follow'
        }
      })
    },

    followedsDetail () {
      this.$router.push({
        path: '/user/follow/' + this.profile.userId,
        query: {
          type: 'followeds'
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.right {
  line-height: 1.5;
}

.avatar {
  height: 190px;
  width: 190px;
  border-radius: 100%;
  display: block;
}

.nickname {
  font-size: 20px;
  font-weight: bold;
}

.other {
  position: relative;

  & > * {
    margin-right: 10px;
  }
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
  font-size: 20px;
}

.identify {
  height: 20px;
  color: #f0483b;
  background-color: #fde4e2;
  padding: 3px 8px 3px 0;
  border-radius: 20px;

  &-icon {
    margin-right: 5px;
    vertical-align: text-top;
    height: inherit;
  }

  &-desc {
    display: inline-block;
    transform: translateY(-2px);
  }
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
    color: var(--color-gray);
  }
}

.mutual {
  transform: rotate(90deg);
}
</style>

<style lang="less">
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