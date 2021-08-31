import { getLoginStatus } from 'network/common/login'
import { mapMutations } from 'vuex'
import {
  getUserDetail, Profile, getLikeList, getArtistSubList, getUserFollows,
  Follow
} from 'network/pageRequest/user'
import { Artist } from 'network/common'

// 更新登录状态
export const updateLoginStatus = {
  methods: {
    ...mapMutations([
      'setIsLogin',
      'setLoginUser',
      'setLikeListSet',
      'setArtistSub',
      'pushFollowList'
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
      getArtistSubList(limit, offset, Date.now()).then(res => {
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
      getLikeList(userId, Date.now()).then(res => {
        if (res.code === 200) {
          this.setLikeListSet(new Set(res.ids))
        }
      })
    },

    getUserFollows (uid, limit = 50, offset = 0) {
      getUserFollows(uid, limit, offset, Date.now()).then(res => {
        if (res.code === 200) {
          console.log('用户关注列表为：', res)
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

    getLoginStatus () {
      getLoginStatus(Date.now()).then(res => {
        const data = res.data
        const userId = data.profile.userId
        if (data.code === 200 && data.account !== null && data.profile !== null) {
          this.getUserDetail(userId).then(() => {
            this.getUserFollows(userId)
            this.getLikeList(userId)
            this.getArtistSubList()
          })
        } else {
          this.setIsLogin(false)
        }
      })
    }
  }
}