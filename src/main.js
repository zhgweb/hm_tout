import Vue from 'vue'
import App from './App.vue'
// 引入element-ui 框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入 vue-router
import router from '@/router'
Vue.use(ElementUI)
Vue.config.productionTip = false
// 根实例
new Vue({
  router, // 挂载
  render: h => h(App)
}).$mount('#app')
// main.js的作用
// 职责1:创建一个根实例
// 职责2:复杂全局范围的依赖导入
