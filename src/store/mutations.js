import Vue from 'vue'

export default {
  // 覆盖至歌单
  addToPlayList (state, payload) {
    state.playList = Array.from(payload.playList) // 使之不是同一引用
    this.commit('setListCurrentIndex', payload.index) // 播放该下标歌曲
    Vue.prototype.$bus.$emit('replacePlayList') // 发送歌单替换事件
  },

  // 添加新的歌曲，若以存在则跳转
  addMusic (state, music) {
    if (this.getters.playListMap.has(music.id)) { // 播放列表是否存在该歌曲
      // 存在,定位至歌曲
      const findIndex = this.getters.playListMap.get(music.id)
      this.commit('setListCurrentIndex', findIndex)
      Vue.prototype.$bus.$emit('addMusic', findIndex) // 存在,传递index
    } else {
      // 不存在,添加
      const index = state.listCurrentIndex
      state.playList.splice(index + 1, 0, music) // 在当前位置之后插入歌曲
      this.commit('setListCurrentIndex', index + 1) // 设置插入歌曲的位置
      Vue.prototype.$bus.$emit('addMusic', false) // 不存在
    }
  },

  // 设置或添加歌曲使其在下一首播放
  addNextMusic (state, music) {
    const index = state.listCurrentIndex

    // 查找歌曲是否存在
    if (!this.getters.playListMap.has(music.id)) {
      console.log('直接添加歌曲')
      state.playList.splice(index + 1, 0, music) // 在当前位置之后插入歌曲
      Vue.prototype.$bus.$emit('addNextMusic', false) // 不存在
    } else {
      let newIndex
      const findIndex = this.getters.playListMap.get(music.id) // 查找存在位置
      state.playList.splice(findIndex, 1) // 删除

      if (findIndex < index) { // 若存在歌曲索引在当前歌曲之前
        this.commit('setListCurrentIndex', index - 1) //  则索引-1以保证当前歌曲不变(因为删除了)
        state.playList.splice(index, 0, music) // 因为索引已经减一，因此可直接设置原位置
        newIndex = index
      } else {
        state.playList.splice(index + 1, 0, music) // 正常设置索引
        newIndex = index + 1
      }

      Vue.prototype.$bus.$emit('addNextMusic', newIndex) // 存在，传索引
    }
  },

  // 批量插入歌曲
  addNextMusics (state, musics) {
    let currentIndex = state.listCurrentIndex
    let delIndex // 需要删除的索引
    musics.forEach((music, index) => {
      if (this.getters.playListMap.has(music.id)) { // 判断歌曲是否存在于播放列表
        if (this.getters.currentPlayMusic.id === music.id) { // 判断是否为当前播放
          delIndex = index
        } else {
          const index = this.getters.playListMap.get(music.id) // 获得歌曲索引
          state.playList.splice(index, 1) // 删除播放列表中的原歌曲
          if (index < currentIndex) { // 若删除歌曲在当前歌曲之前，索引-1
            this.commit('setListCurrentIndex', --currentIndex)
          }
        }
      }
    })
    delIndex !== undefined && musics.splice(delIndex, 1) // 遍历完成之后再删除，否则bu
    state.playList.splice(currentIndex + 1, 0, ...musics)
    Vue.prototype.$bus.$emit('addNextMusics') // 存在，传索引
  },

  // 清除播放列表
  clearList (state) {
    this.getters.currentPlayMusic.state.currentBroadcast = false // 当前播放属性取消
    state.playList = []
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

  // 设置播放顺序
  setPlayOrder (state, order) {
    state.playOrder = order
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

  // * 收藏专辑相关
  // 添加至收藏专辑
  pushSubAlbum (state, id) {
    Vue.set(state.loginUser.subAlbum, id, id)
  },

  // 移除专辑收藏
  deleteSubAlbum (state, id) {
    Vue.delete(state.loginUser.subAlbum, String(id))
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

  // 插入收藏歌单
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
  },

  updateSubList (state) {
    state.loginUser.subList = new Map(state.loginUser.subList)
  }
}