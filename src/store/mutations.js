import Vue from 'vue'

export default {
  // 添加至歌单
  addToPlayList (state, payload) {
    if (payload.playList !== state.playList) { // 播放列表不同才切换
      const music = Vue.prototype.$music
      if (music !== undefined) {
        music.pause() // 暂停当前歌曲播放
      }
      state.playList = payload.playList
    }
    if (payload.index !== state.listCurrentIndex) { // 播放歌曲下标不同才跳转
      this.commit('setListCurrentIndex', payload.index) // 播放该下标歌曲
    }
  },

  // 添加新的歌曲，若以存在则跳转
  addMusic (state, music) {
    const findIndex = state.playList.findIndex(item => item.id === music.id)
    if (findIndex === -1) {
      const index = state.listCurrentIndex
      state.playList.splice(index + 1, 0, music) // 在当前位置之后插入歌曲
      this.commit('setListCurrentIndex', index + 1) // 设置插入歌曲的位置
    } else {
      this.commit('setListCurrentIndex', findIndex)
    }
  },

  // 设置歌曲位置
  setListCurrentIndex (state, currentIndex) {
    if (currentIndex >= 0 && currentIndex < state.playList.length) {
      state.listCurrentIndex = currentIndex
    } else if (currentIndex < 0) {
      state.listCurrentIndex = state.playList.length - 1
    } else {
      state.listCurrentIndex = 0
    }

    if (Vue.prototype.$music !== undefined) {
      Vue.prototype.$music.play() // 设置位置之后使其开始播放
    }
  },

  setIsLoadingMusic (state, bool) {
    state.isLoadingMusic = bool
  },

  setIsPaused (state, currentState) {
    state.isPaused = currentState
  },

  // 设置无限滚动状态
  setInfiniteScrollDisabled (state, bool) {
    state.infiniteScrollDisabled = bool
  },

  // 设置登录状态
  setIsLogin (state, isLogin) {
    state.isLogin = isLogin
  },

  // 设置当前登录用户信息
  setLoginUser (state, loginUser) {
    state.loginUser = loginUser
  },

  // * 喜欢相关
  // 设置喜欢列表
  setLikeListSet (state, set) {
    state.loginUser.likeListSet = set
  },

  // 将歌曲添加至喜欢列表
  addLikeList (state, id) {
    state.loginUser.likeListSet = new Set(state.loginUser.likeListSet.add(id))
  },

  // 将歌曲移除喜欢列表
  delLikeList (state, id) {
    state.loginUser.likeListSet.delete(id)
    state.loginUser.likeListSet = new Set(state.loginUser.likeListSet)
  },

  // * 收藏歌手相关
  // 设置收藏歌手列表
  setArtistSub (state, iterable) {
    state.loginUser.artistSub = iterable
  },

  // 收藏歌手
  artistSub (state, artist) {
    state.loginUser.artistSub = new Map(state.loginUser.artistSub.set(artist.id, artist))
  },

  // 取消收藏歌手
  artistUnfollow (state, id) {
    state.loginUser.artistSub.delete(id)
    state.loginUser.artistSub = new Map(state.loginUser.artistSub)
  },

  // * 关注列表相关
  // 设置关注列表
  pushFollowList (state, payload) {
    state.loginUser.followList = new Map(state.loginUser.followList.set(payload.key, payload.value))
  },

  // 取消关注用户
  userUnfollow (state, id) {
    state.loginUser.followList.delete(id)
    state.loginUser.followList = new Map(state.loginUser.followList)
  },

  // * 收藏歌单相关
  pushSubList (state, id) {
    Vue.set(state.loginUser.subList, id, id)
  },

  unSubList (state, id) {
    Vue.delete(state.loginUser.subList, id)
  }
}