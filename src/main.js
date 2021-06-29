import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/element-ui/index' // element ui 按需导入
import 'normalize.css'

import 'assets/js/Symbol/iconfont'

import Vuebar from 'vuebar' // 滚动栏样式
Vue.use(Vuebar)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() // 添加一个事件总线

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
