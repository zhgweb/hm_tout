import VueRouter from 'vue-router' // 引入vue-router
import Vue from 'vue'
import Login from '@/views/login' // 引入登录页面组件
import Home from '@/views/home' // 引入首页
Vue.use(VueRouter) // 全局使用
const router = new VueRouter({
  // 路由配置对象
  // 关键选项:routes 作用 配置路由规则
  routes: [
    // 登录
    {
      path: '/login',
      // 指定地址对应的组件 需要导入
      component: Login
    },
    // 首页
    {
      path: '/',
      component: Home
    }
  ]
})
export default router // 导出 需要在main.js导入
