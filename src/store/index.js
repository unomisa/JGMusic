import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  playList: [], // 播放列表
  isLoadingMusic: true, // 是否正在加载歌曲
  isPaused: true, // 是否暂停
  listCurrentIndex: 0, // 当前列表下标
  isLogin: false, // 是否登录
  loginUser: {} // 登录用户
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})