import Vue from 'vue'

export default {
  // 添加至歌单
  addToPlayList (state, payload) {
    state.playList = [] // 歌单清空
    payload.songs.forEach(song => {
      payload.first !== song && state.playList.push(song)
    })
    state.playList.unshift(payload.first)
  },

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

  // 设置登录状态
  setIsLogin (state, isLogin) {
    state.isLogin = isLogin
  },

  // 设置当前登录用户信息
  setLoginUser (state, loginUser) {
    state.loginUser = loginUser
  }
}