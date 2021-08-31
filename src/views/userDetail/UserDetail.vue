<template>
  <div v-bar>
    <div style="position: relative;">
      <div class="backdrop"></div>
      <div class="user-detail">
        <user-profile :profile="profile" />
        <user-song-list :created="created" :subscribed="subscribed" />
      </div>
    </div>
  </div>
</template>

<script>
import UserProfile from './childComp/UserProfile.vue'

import { getUserDetail, getUserPlaylist, Profile } from 'network/pageRequest/user'
import UserSongList from './childComp/UserSongList.vue'

export default {
  name: 'UserDetail',
  components: { UserProfile, UserSongList },
  data () {
    return {
      profile: {}, // 个人信息
      created: [], // 创建的歌单
      subscribed: [], // 收藏的歌单,
      limit: 30, // 歌单每次请求数量
      offset: 0 // 歌单偏移数量
    }
  },
  methods: {
    getUserPlaylist () {
      const userId = parseInt(this.$route.params.userId)
      getUserPlaylist(userId, this.limit, this.offset, Date.now()).then(res => {
        // console.log('歌单信息为：', JSON.parse(JSON.stringify(res)))
        if (res.code === 200) {
          res.playlist.forEach((songList) => {
            if (songList.userId === userId) {
              this.created.push(songList)
            } else {
              this.subscribed.push(songList)
            }
          })
          if (res.more === true) {
            this.offset += this.limit
            this.getUserPlaylist()
          }
        }
      })
    }
  },
  created () {
    const userId = parseInt(this.$route.params.userId)
    getUserDetail(userId).then(res => {
      if (res.code === 200) {
        this.profile = new Profile(res)

        // profile信息加载完成
        this.$bus.$emit('userProfileLoading', false)
      }
    })

    this.getUserPlaylist()
  }
}
</script>

<style lang="less" scoped>
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
  background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
  // border: 1px solid transparent;
}
</style>

<style lang="less">
</style>