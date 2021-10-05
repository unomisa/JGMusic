import { Music } from '../network/common'
export default {
  currentPlayMusic (state) {
    if (state.playList.length > 0) {
      return state.playList[state.listCurrentIndex]
    } else {
      return new Music({
        id: 0,
        name: '',
        picUrl: '',
        alias: [],
        artists: [],
        album: [],
        duration: 0,
        pop: 0,
        tns: ''
      })
    }
  },

  playList (state) {
    return state.playList
  },

  // map方便歌曲是否存在
  playListMap (state) {
    return new Map(state.playList.map((music, index) => [music.id, index]))
  },

  // 专辑收藏列表
  AlbumSubList (state) {
    return state.loginUser.subAlbum
  },

  isExistCurrentPlayMusic (state) {
    return state.playList.length > 0
  }
}