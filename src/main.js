import Vue from 'vue'
import App from './App.vue'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// ElementUI 是一个插件  集成了很多组件
Vue.use(ElementUI) // 全局使用
Vue.config.productionTip = false
// 根实例
new Vue({
  render: h => h(App)
}).$mount('#app')
// main.js的作用
// 职责1:创建一个根实例
// 职责2:复杂全局范围的依赖导入
