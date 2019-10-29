// 引入axios 导出一个配置好的axios提供给main挂载
import axios from 'axios'
import local from '@/utils/local' // 引入存储自定义模块
import router from '@/router' // 引入router
// 对axios进行配置
// baseURL  作用：设置基准地址（前面一段相同的地址）
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 配置请求头
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // 1. 获取token
  const user = local.getUser() || {}
  // 2. 头部设置token
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, (error) => {
  // 对请求错误做些什么
  // 约定：一定要返回一个 错误的promise对象
  // Promise.reject(error) 创建一个promise对象且一定失败
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(response => response,
  // 响应成功的时候执行
  // 对响应数据做点什么
  (error) => {
    // 响应失败的时候执行
    // 对响应错误做点什么
    // 获取响应状态码  然后判断是不是401  如果是跳转登录
    if (error.request.status === 401) {
      return router.push('/login')
    }
    // 获取响应对象error.response
    // 状态码error.response.status
    return Promise.reject(error)
  })

export default axios
