<template>
  <preview @click.native="userDetail">
    <template v-slot:left>
      <el-image class="cover" :src="user.avatarUrl + '?param=100y100'"
                fit="fill" />
      <span v-if="user.authStatus === 1">
        <el-avatar class="author-icon" shape="circle"
                   :src="user.avatarDetail.identityIconUrl + '?param=20y20'"
                   fit="fill" />
      </span>
    </template>
    <template v-slot:right>
      <div class="right">
        <div class="name">{{user.name}}</div>
        <div class="other">
          <span class="followeds">粉丝：{{user.followeds}}</span>
          <el-button class="other-btn" type="primary" size="mini"
                     @click.stop="followControl">
            <i class="el-icon-sort mutual" v-if="user.mutual"></i>
            <i class="el-icon-check" v-if="!user.mutual && user.followed"></i>
            <i class="el-icon-plus" v-if="!user.followed"></i>
            {{btnText}}
          </el-button>
        </div>
        <div class="signature">{{user.signature}}</div>
      </div>
    </template>
  </preview>
</template>

<script>
import Preview from 'components/content/preview/Preview'

import { followUser, User } from 'network/common'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { Preview },
  props: {
    user: {
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

    btnText () {
      if (this.user.mutual) {
        return '相互关注'
      } else if (this.user.followed) {
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

    userDetail () {
      this.$router.push('/user/detail/' + this.user.id)
    },

    followControl () {
      const uid = parseInt(this.user.id)
      if (this.user.followed) {
        followUser(uid, 0, Date.now()).then(res => {
          if (res.code === 200) {
            // console.log('取消关注：', res)
            this.userUnfollow(uid)
            this.user.followed = false // 设置不再关注
            this.user.mutual = false // 设置不是相互关注
            this.$notify.topleft('已取消关注')
          }
        })
      } else {
        followUser(uid, 1, Date.now()).then(res => {
          if (res.code === 200) {
            // console.log('关注：', res)
            this.pushFollowList({
              key: uid,
              value: {
                ...this.user,
                followed: true
              }
            })
            this.user.followed = res.user.followed // 根据返回设置
            this.user.mutual = res.user.mutual // 根据返回设置
            this.$notify.topleft('已关注')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@height: 100px;
.cover {
  position: relative;
  z-index: 1;
  height: @height;
  width: @height;
  border-radius: 100%;
  border: 1px solid var(--color-border);
  border-right: none;
}

.row {
  width: 100%;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
}

.author-icon {
  position: absolute;
  z-index: 3;
  right: 3px;
  bottom: 3px;
  height: 20px;
  width: 20px;
}

.name {
  &:extend(.omit);
  margin-right: 10px;
}

.omit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.followeds {
  color: var(--color-gray);
  font-size: 14px;
}

.other {
  line-height: 28px;
  &-btn {
    float: right;
  }
}

.mutual {
  transform: rotate(90deg);
}

.signature {
  &:extend(.omit);
  font-size: 14px;
  color: var(--color-light-gray);
}
</style>