<template>
  <div class="page">
    <div class="backdrop"></div>
    <div class="user-detail">
      <user-profile :profile="profile" :profileLoading="profileLoading" />
      <user-song-list :created="created" :subscribed="subscribed"
                      :loading="userListLoading" />
    </div>
  </div>

</template>

<script>
import UserProfile from './childComp/UserProfile.vue'

import { getUserDetail, getUserPlaylist, Profile } from 'network/pageRequest/user'
import UserSongList from './childComp/UserSongList.vue'
import { SongList } from 'network/common'
import { mapMutations } from 'vuex'

export default {
  name: 'UserDetail',
  components: { UserProfile, UserSongList },
  data () {
    return {
      profile: {}, // 个人信息
      created: [], // 创建的歌单
      subscribed: [], // 收藏的歌单,
      limit: 100, // 歌单每次请求数量
      offset: 0, // 歌单偏移数量,
      profileLoading: true,
      userListLoading: true
    }
  },
  methods: {
    ...mapMutations([
      'setInfiniteScrollDisabled'
    ]),

    getUserPlaylist () {
      const userId = parseInt(this.$route.params.userId)
      getUserPlaylist(userId, this.limit, this.offset, Date.now()).then(res => {
        console.log('歌单信息为：', JSON.parse(JSON.stringify(res)))
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
          } else {
            this.setInfiniteScrollDisabled(true)
          }
        }
      })
    }
  },
  created () {
    const userId = parseInt(this.$route.params.userId)
    getUserDetail(userId).then(res => {
      console.log('歌手信息为：', res)
      if (res.code === 200) {
        this.profile = new Profile(res)
        this.profileLoading = false
      }
    })

    this.getUserPlaylist()
  },
  mounted () {
    this.$bus.$on('infiniteScroll', this.getUserPlaylist)
  },
  destroyed () {
    this.$bus.$off('infiniteScroll')
  },
  deactivated () {
    this.$bus.$off('infiniteScroll')
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