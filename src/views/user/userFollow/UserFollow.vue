<template>
  <div class="container">
    <div class="content">
      <loading :loading="loading" :empty="empty">
        <div class="title">
          <span class="keywords">{{profile.nickname}}</span>
          的{{text}}
        </div>
        <div class="preview-list">
          <user-preview class="preview-item" v-for="user in result"
                        :key="user.id" :user="user" />
        </div>

        <el-pagination background layout=" prev, pager, next" :total="count"
                       :page-size="20" :pager-count="9"
                       @current-change="pageChange" />

        <template v-slot:empty>
          <span class="title">
            <span class="keywords">{{profile.nickname}}</span>
            还没有{{text}}~</span>
        </template>
      </loading>
    </div>
  </div>
</template>

<script>
import UserPreview from 'components/content/preview/preview_col/user_col/UserPreview.vue'
import Loading from 'components/common/loading/Loading.vue'

import { getUserDetail, getUserFollows, getUserFolloweds, Profile } from 'network/pageRequest/user'
import { User } from 'network/common'

export default {
  name: 'userFollow',
  components: { UserPreview, Loading },
  data () {
    return {
      profile: {},
      result: [],
      loading: true,
      empty: false
    }
  },
  computed: {
    uid () {
      return this.$route.params.userId
    },

    type () {
      return this.$route.query.type
    },

    count () {
      const profile = this.profile
      if (this.type === 'follow') {
        return profile.follows
      } else if (this.type === 'followeds') {
        return profile.followeds
      } else {
        return 0
      }
    },

    text () {
      if (this.type === 'follow') {
        return '关注'
      } else if (this.type === 'followeds') {
        return '粉丝'
      } else {
        return ''
      }
    }
  },
  methods: {
    // * 网络请求

    getUserDetail () {
      const userId = parseInt(this.$route.params.userId)
      return getUserDetail(userId).then(res => {
        // console.log('用户信息为：', res)
        if (res.code === 200) {
          this.profile = new Profile(res)
        }
      })
    },

    getUserFollows (limit = 20, offset = 0) {
      return getUserFollows(this.uid, limit, offset).then(res => {
        console.log('关注为：', res)
        if (res.code === 200) {
          if (res.follow.length === 0) {
            this.empty = true
          } else {
            this.result = res.follow.map(user => new User(user))
          }
        }
      })
    },

    getUserFolloweds (limit = 20, offset = 0) {
      return getUserFolloweds(this.uid, limit, offset).then(res => {
        // console.log('粉丝为:', res)
        if (res.code === 200) {
          if (res.followeds.length === 0) {
            this.empty = true
          } else {
            this.result = res.followeds.map(user => new User(user))
          }
        }
      })
    },

    request () {
      if (this.type === 'follow') {
        return this.getUserFollows()
      } else if (this.type === 'followeds') {
        return this.getUserFolloweds()
      }
    },

    pageChange (page) {
      this.loading = true // 切换页面，使其正在加载
      const offset = (page - 1) * 20
      if (this.type === 'follow') {
        this.getUserFollows(20, offset).then(() => {
          this.loading = false
        })
      } else if (this.type === 'followeds') {
        this.getUserFolloweds(20, offset).then(() => {
          this.loading = false
        })
      }
    }
  },
  created () {
    Promise.all([
      this.getUserDetail(),
      this.request()
    ]).then(() => {
      this.loading = false // 两个请求都完成之后显示内容
    })
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  overflow: hidden;
}

.content {
  position: relative;
  width: var(--width-main);
  margin: 0 auto;
}

.title {
  margin: 24px 0;
  font-size: 20px;
  font-weight: bold;
}

.el-pagination {
  text-align: center;
  margin: 36px 0;
}

.preview {
  &-list {
    display: flex;
    flex-wrap: wrap;
  }

  &-item {
    height: auto;
    flex: 48% 0;
    box-sizing: border-box;
    margin-right: 4%;

    &:nth-child(2n) {
      margin-right: 0;
    }

    &:nth-child(2n + 1) {
      background-color: white;
    }
  }
}

.keywords {
  color: #61b7ed;
}
</style>