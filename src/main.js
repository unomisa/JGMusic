import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/element-ui/index' // element ui 按需导入
import 'normalize.css'

import 'assets/js/Symbol/iconfont' // 导入第三方图标
import contentmenu from 'v-contextmenu' // 上下文菜单组件
import 'v-contextmenu/dist/index.css' // 上下文菜单样式
import comment from 'components/content/comment/plugin/index' // 评论组件

import Vuebar from 'vuebar' // 滚动栏样式
Vue.use(contentmenu)
Vue.use(Vuebar)
Vue.use(comment)

Vue.prototype.$bus = new Vue() // 添加一个事件总线
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/**
 * todo  某些页面需记住其高度
 * todo  歌手榜,
 * todo  网络请求优化
 * todo  完善首页轮播图其它类型事件响应,
 * todo  音乐播放界面使用非路由方式
 * todo  单评论页面
 * todo  歌单添加歌曲时可能歌曲没有加载完成
 * todo  歌单列表当前歌曲定位
 * todo  歌单里歌曲搜索
 * todo  搜索弹框问题
 * todo  重新请求好像无效
 */