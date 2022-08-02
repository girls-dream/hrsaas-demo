import router from '@/router'
import store from '@/store'
// 路由(全局)前置守卫
// 会在所有路由进入之前触发
const whiteList = ['/login', '404']
router.beforeEach((to, form, next) => {
  const token = store.state.user.token
  // console.log(token)
  if (token) {
    // 判断有没有token 有的话进入登录页
    // 判断当前在登陆页面 有token的话回不去登陆页面
    if (!store.state.user.userInfo.userId) {
      //判断首页有没有用户id有的话切换路由时不发送请求
      store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') return next('/')
    next()
  } else {
    // 2未登录
    // 访问的是否在白名单(未登录也能访问的页面)
    // console.log(to.path);
    const isCluedes = whiteList.includes(to.path)
    if (isCluedes) {
      // 是否包含 是的话放行
      next()
    } else {
      // 不在的话跳到登陆页面
      next('/login')
    }
  }
})
