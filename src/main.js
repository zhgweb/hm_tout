import Vue from 'vue'
import App from './App.vue'
// 引入element-ui 框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入 vue-router
import router from '@/router'
// 导入 axios
import axios from '@/api'
// 导入提取封装的多用组件
import myBread from '@/components'
import JsonBig from 'json-bigint'
import '@/styles/index.less' // 引入全局css样式
// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
axios.defaults.transformResponse = [(data) => {
  // 对 data 进行任意转换处理
  // 后台的原始数据   理想情况 json字符串
  try { return JsonBig.parse(data) } catch (e) {
    return data
  }
}]
Vue.use(myBread)
// 往vue的原型对象里面加一个$http方法
// 全局下使用axios
Vue.prototype.$http = axios
// 全局下使用 element-ui 框架
Vue.use(ElementUI)
Vue.config.productionTip = false
// 根实例
new Vue({
  router, // 挂载
  render: h => h(App)
}).$mount('#app')
// main.js的作用
// 职责1:创建一个根实例
// 职责2:复则全局范围的依赖导入
