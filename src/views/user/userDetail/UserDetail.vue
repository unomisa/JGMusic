<template>
  <div class="page">
    <div class="backdrop"></div>
    <div class="user-detail">
      <user-profile :profile="profile" :profileLoading="profileLoading"
                    @profileChange="profileChange" />

      <user-song-list :created="created" :subscribed="subscribed"
                      :loading="userListLoading" />
    </div>
  </div>
</template>

<script>
import UserProfile from './childComp/UserProfile.vue'
import UserSongList from './childComp/UserSongList.vue'

import { getUserDetail, getUserPlaylist, Profile } from 'network/pageRequest/user'
import { SongList } from 'network/common'
import { mapMutations, mapState } from 'vuex'
import { infiniteScroll } from 'common/mixin'

export default {
  name: 'UserDetail',
  mixins: [infiniteScroll],
  components: { UserProfile, UserSongList },
  data () {
    return {
      profile: {}, // 个人信息
      created: [], // 创建的歌单
      subscribed: [], // 收藏的歌单,
      limit: 100, // 歌单每次请求数量
      offset: 0, // 歌单偏移数量,
      profileLoading: true,
      userListLoading: true,
      more: false // 是否允许加载更多
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ])
  },
  methods: {
    ...mapMutations([
      'setInfiniteScrollDisabled'
    ]),

    getUserPlaylist () {
      const userId = parseInt(this.$route.params.userId)
      return getUserPlaylist(userId, this.limit, this.offset, Date.now()).then(res => {
        // console.log('歌单信息为：', JSON.parse(JSON.stringify(res)))
        if (res.code === 200) {
          res.playlist.forEach((songList) => {
            if (songList.userId === userId) {
              this.created.push(new SongList(songList))
            } else {
              this.subscribed.push(new SongList(songList))
            }
          })

          this.userListLoading = false

          if (res.more === true) {
            this.offset += this.limit
            this.setInfiniteScrollDisabled(false)
            this.more = true // 第一次加载后才能加载更多，否则会重复
          } else {
            this.setInfiniteScrollDisabled(true)
          }
        }
      })
    },

    morePlayList () {
      this.more && this.getUserPlaylist()
    },

    getUserDetail () {
      const userId = parseInt(this.$route.params.userId)
      getUserDetail(userId).then(res => {
        console.log('用户信息为：', res)
        if (res.code === 200) {
          this.profile = new Profile(res)
          this.profileLoading = false
        }
      })
    },

    // * 事件响应
    profileChange (profile) {
      this.profile = profile
    }
  },
  created () {
    this.getUserDetail()
    this.getUserPlaylist()
  },
  mounted () {
    this.$bus.$on('infiniteScroll', this.morePlayList)
  },
  activated () {
    this.$bus.$on('infiniteScroll', this.morePlayList)
  },
  watch: {
    // 监听当前用户歌单的改变，更新数据
    'loginUser.subList' () {
      const userId = parseInt(this.$route.params.userId)
      if (userId === parseInt(this.loginUser.userId)) {
        const lists = Array.from(this.loginUser.subList.values())
        this.created = lists.filter(list => !list.subscribed)
        this.subscribed = lists.filter(list => list.subscribed)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  position: relative;
  overflow: hidden;
}

.user-detail {
  width: var(--width-main);
  margin: 0 auto;
}

.backdrop {
  position: absolute;
  z-index: -1;
  content: "";
  width: 100%;
  height: 230px;
  background-image: linear-gradient(to top, #ffffff 0%, #dfe9f3 100%);
  // border: 1px solid transparent;
}
</style>