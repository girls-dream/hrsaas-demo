// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'
function isTimeOut() {
  // const currentTime = Date.now()
  // const tokenTime = getTokenTime()
  const timeOut = 99999999
  // 当前时间-获取token时间
  return !!(Date.now() - getTokenTime() > timeOut)
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}) // 创建一个axios的实例
// 请求拦截器
service.interceptors.request.use(async (config) => {
  if (store.state.user.token) {
    if (isTimeOut()) {
      // 判断token是否过期 过期的话 跳到登录页
      await store.dispatch('user/logout')
      router.push('/login')
      // return Promise.reject(new Error('登陆失效,请重新登录'))
    } else {
      // token没有过期再携带请求头
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return config
})
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    console.log(res)
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async function (error) {
    // 对相应错误做点什么
    // es11
    if (error?.response?.status === 401) {
      Message.error('登陆失效,请重新登录')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  },
)
export default service // 导出axios实例
