import Vue from 'vue'

export default {
  // 添加至歌单
  addToPlayList (state, payload) {
    state.playList = Array.from(payload.playList) // 使之不是同一引用
    this.commit('setListCurrentIndex', payload.index) // 播放该下标歌曲
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

  // 设置或添加歌曲使其在下一首播放
  addNextMusic (state, music) {
    const findIndex = state.playList.findIndex(item => item.id === music.id)
    const index = state.listCurrentIndex
    if (findIndex === -1) {
      state.playList.splice(index + 1, 0, music) // 在当前位置之后插入歌曲
    } else {
      state.playList.splice(findIndex, 1)

      if (findIndex < index) {
        this.commit('setListCurrentIndex', index - 1) // 如果该歌曲在同一歌单并且在当前播放索引前，则索引-1以保证当前歌曲不变
        state.playList.splice(index, 0, music) // 因为索引已经减一，因此可直接设置原位置
      } else {
        state.playList.splice(index + 1, 0, music) // 正常设置索引
      }
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
  pushSubList (state, payload) {
    state.loginUser.subList = new Map(state.loginUser.subList.set(parseInt(payload.key), payload.value))
  },

  insertSUubList (state, payload) {
    let index = 0
    const newMap = new Map()
    for (const list of state.loginUser.subList) {
      if (index === payload.index) {
        newMap.set(payload.list.id, payload.list)
      }
      newMap.set(list[0], list[1])
      index++
    }
    state.loginUser.subList = newMap
  },

  unSubList (state, id) {
    state.loginUser.subList.delete(id)
    state.loginUser.subList = new Map(state.loginUser.subList)
    console.log('删除后的收藏为：', state.loginUser.subList)
  },

  updateSubList (state) {
    state.loginUser.subList = new Map(state.loginUser.subList)
  }
}