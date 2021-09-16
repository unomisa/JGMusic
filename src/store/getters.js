export default {
  currentPlayMusic (state) {
    if (state.playList.length > 0) {
      return state.playList[state.listCurrentIndex]
    } else {
      return {}
    }
  },

  isExistCurrentPlayMusic (state, getters) {
    return Object.keys(getters.currentPlayMusic).length > 0
  }
}