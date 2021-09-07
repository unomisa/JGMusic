import { getLoginStatus } from 'network/common/login'
import { mapMutations } from 'vuex'
import {
  getUserDetail, Profile, getLikeList, getUserFollows,
  Follow, getUserPlaylist, getArtistSubList
} from 'network/pageRequest/user'
import { Artist } from 'network/common'

// 更新登录状态s
export const updateLoginStatus = {
  methods: {
    ...mapMutations([
      'setIsLogin',
      'setLoginUser',
      'setLikeListSet',
      'setArtistSub',
      'pushFollowList',
      'pushSubList'
    ]),

    getUserDetail (userId) {
      return getUserDetail(userId, Date.now()).then(res => {
        // console.log('用户详情为：', res)
        if (res.code === 200) {
          this.setLoginUser(new Profile(res))
          this.setIsLogin(true)
        }
      })
    },

    getArtistSubList (limit = 25, offset = 0) {
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
            value: new Follow(user)
          }))
          if (res.more) {
            this.getUserFollows(uid, limit, offset + limit)
          }
        }
      })
    },

    getUserPlaylist (uid, limit = 50, offset = 0) {
      return getUserPlaylist(uid, limit, offset, Date.now()).then(res => {
        if (res.code === 200) {
          // console.log('当前用户歌单信息为：', res)
          res.playlist.forEach(list => {
            this.pushSubList(list.id)
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
                  this.getArtistSubList()
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
        duration: music.dt
      }
    }
  }
}