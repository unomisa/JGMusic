import Vue from 'vue'

export default {

  setMusicSrc (state, src) {
    Vue.set(state.playList[state.listCurrentIndex], 'src', src)
  },

  addToPlayList (state, payload) {
    state.playList = []
    payload.songs.forEach(song => {
      payload.first !== song && state.playList.push(song)
    })
    state.playList.unshift(payload.first)
  },

  setCurrentBroadcast (state, music) {
    music.currentBroadcast = !music.currentBroadcast
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
  }

}