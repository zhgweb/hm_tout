import VueRouter from 'vue-router' // 引入vue-router
import Vue from 'vue'
import Login from '@/views/login' // 引入登录页面组件
import Home from '@/views/home' // 引入首页
import Welcome from '@/views/welcome' // 引入欢迎页面
import NotFound from '@/views/404' // 引入404页面
import local from '@/utils/local' // 引入存储自定义模块
import Article from '@/views/article' // 引入内容模块
import Image from '@/views/image' // 引入素材模块
import Publish from '@/views/publish' // 引入发布模块
import Comment from '@/views/comment' // 引入发布模块

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
      component: Home,
      children: [{
        path: '/',
        component: Welcome
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/image',
        component: Image
      },
      {
        path: '/publish',
        component: Publish
      },
      {
        path: '/comment',
        component: Comment
      }]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
// 路由导航守卫（前置导航守卫）
router.beforeEach((to, from, next) => {
  // to 跳转目标路由对象
  // from 从哪里跳过来的路由对象
  // next() 放行  next('/login') 拦截到登录
  // next()
  // 如果你访问的不是登录页面，且又没有登录，跳转到登录页面。
  const user = local.getUser()
  if (to.path !== '/login' && !user) {
    return next('/login')
  }
  next()
})

export default router // 导出 需要在main.js导入
