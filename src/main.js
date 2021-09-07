import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/element-ui/index' // element ui 按需导入
import 'normalize.css'

import 'assets/js/Symbol/iconfont' // 导入第三方图标

import Vuebar from 'vuebar' // 滚动栏样式
Vue.use(Vuebar)

Vue.prototype.$bus = new Vue() // 添加一个事件总线
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/**
 * todo 1. 一些音乐无法播放问题,使其变灰
 * todo ? 3. 歌手详情格式
 * todo 9. 某些页面需记住其高度
 * todo 4. 短信验证登录
 * todo 5. 右键点击上下文，删除歌曲
 * todo 8. 排行榜歌单增加图标
 * todo 9. 个人信息歌单添加骨架
 * todo 10. 歌手榜
 * todo 11. 歌单、歌曲数据分段请求
 * todo 12. 歌词阴影重新处理
 */