import { getLoginStatus } from 'network/common/login'
import { mapMutations, mapState } from 'vuex'
import {
  getUserDetail, LoginUser, getLikeList, getUserFollows,
  getUserPlaylist, getArtistSubList, getAlbumSubList
} from 'network/pageRequest/user'
import { Artist, SongList, User } from 'network/common'

// 更新登录状态s
export const updateLoginStatus = {
  methods: {
    ...mapMutations([
      'setIsLogin',
      'setLoginUser',
      'setLikeListSet',
      'setArtistSub',
      'pushFollowList',
      'pushSubList',
      'pushSubAlbum'
    ]),

    getUserDetail (userId) {
      return getUserDetail(userId, Date.now()).then(res => {
        // console.log('当前用户详情为：', res)
        if (res.code === 200) {
          this.setLoginUser(new LoginUser(res))
          this.setIsLogin(true)
        }
      })
    },

    getArtistSubList (limit = 50, offset = 0) {
      return getArtistSubList(limit, offset, Date.now()).then(res => {
        if (res.code === 200) {
          // console.log('收藏歌手列表为：', res)
          if (res.hasMore) {
            this.getArtistSubList(res.count)
          } else {
            this.setArtistSub(new Map(res.data.map(artist => [artist.id, new Artist(artist)])))
          }
        }
      })
    },

    getLikeList (userId) {
      return getLikeList(userId, Date.now()).then(res => {
        if (res.code === 200) {
          this.setLikeListSet(new Set(res.ids))
        }
      })
    },

    getUserFollows (uid, limit = 50, offset = 0) {
      return getUserFollows(uid, limit, offset, Date.now()).then(res => {
        if (res.code === 200) {
          // console.log('用户关注列表为：', res)
          res.follow.forEach(user => this.pushFollowList({
            key: user.userId,
            value: new User(user)
          }))
          if (res.more) {
            this.getUserFollows(uid, limit, offset + limit)
          }
        }
      })
    },

    getAlbumSubList (limit = 50, offset = 0) {
      return getAlbumSubList(limit, offset).then(res => {
        // console.log('收藏专辑为：', res)
        if (res.code === 200) {
          res.data.forEach(album => {
            this.pushSubAlbum(album.id)
          })
          // this.result = res.data.map(artist => new Album(artist))
          // this.loading = false
        }
      })
    },

    getUserPlaylist (uid, limit = 50, offset = 0) {
      return getUserPlaylist(uid, limit, offset, Date.now()).then(res => {
        if (res.code === 200) {
          // console.log('登录用户歌单信息为：', res)
          res.playlist.forEach(list => {
            this.pushSubList({
              key: list.id,
              value: new SongList(list)
            })
          })
          if (res.more) {
            this.getUserPlaylist(uid, limit, offset + limit)
          }
        }
      })
    },

    getLoginStatus () {
      getLoginStatus(Date.now()).then(res => {
        const data = res.data
        if (data.code === 200 && data.account !== null && data.profile !== null) {
          const userId = data.profile.userId
          this.getUserDetail(userId).then(() => {
            this.getUserFollows(userId).then(() => {
              this.getLikeList(userId).then(() => {
                this.getUserPlaylist(userId).then(() => {
                  this.getArtistSubList().then(() => {
                    this.getAlbumSubList()
                  })
                })
              })
            })
            // this.getUserFollows(userId)
            // this.getLikeList(userId)
            // this.getUserPlaylist(userId)
            // this.getArtistSubList()
          })
        } else {
          this.setIsLogin(false)
        }
      })
    }
  }
}

export const updateUserPlaylist = {
  computed: {
    ...mapState([
      'loginUser'
    ])
  },
  methods: {
    ...mapMutations([
      'pushSubList'
    ]),

    getUserPlaylist (uid, limit = 50, offset = 0) {
      const LoginUserId = this.loginUser.userId // 获取当前用户id
      return getUserPlaylist(LoginUserId, limit, offset, Date.now()).then(res => {
        if (res.code === 200) {
          console.log('当前用户歌单信息为：', res)
          res.playlist.forEach(list => {
            this.pushSubList({
              key: list.id,
              value: new SongList(list)
            })
          })
          if (res.more) {
            this.getUserPlaylist(LoginUserId, limit, offset + limit)
          }
        }
      })
    }
  }

}

export const infiniteScroll = {
  mounted () {
    this.setInfiniteScrollDisabled(false) // 监听
  },
  activated () {
    this.setInfiniteScrollDisabled(false) // 监听
    this.$bus.$off('infiniteScroll') // 保证只添加一次事件
  },
  // 离开页面关闭滚动与滚动监听
  deactivated () {
    this.setInfiniteScrollDisabled(true)
    this.$bus.$off('infiniteScroll')
  },

  // ! 销毁周期会在下个页面create之前执行,不能保证在页面结束后执行
  destroyed () {
    this.setInfiniteScrollDisabled(true)
    this.$bus.$off('infiniteScroll')
  }
}

export const playAll = {
  activated () {
    this.$bus.$off('playAll') // 保证只添加一次事件
  },
  // 离开页面关闭滚动与滚动监听
  deactivated () {
    this.$bus.$off('playAll')
  },
  destroyed () {
    this.$bus.$off('playAll')
  }
}

export const updateComment = {
  methods: {
    // 用于添加评论的数据
    addComment (add = true) {
      if (add) {
        this.total++
      } else {
        this.total--
      }
    }
  },
  mounted () {
    this.$bus.$on('addComment', this.addComment)
  },
  destroyed () {
    this.$bus.$off('addComment', this.addComment)
  },
  deactivated () {
    this.$bus.$off('addComment', this.addComment)
  }
}

export const musicBean = {
  methods: {
    musicBean (music) {
      return {
        id: music.id,
        name: music.name,
        picUrl: music.al.picUrl,
        alias: music.alia,
        artists: music.ar,
        album: music.al,
        duration: music.dt,
        pop: music.pop,
        tns: 'tns' in music && music.tns[0]
      }
    }
  }
}
