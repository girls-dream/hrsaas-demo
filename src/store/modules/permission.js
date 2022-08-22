import router, { constantRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [], //自己维护的路由规则
    points:[]//按钮权限
  },
  mutations: {
    setRoutes(state, payload) {
      state.routes = [...constantRoutes, ...payload]
    },
    setPoints(state, payload) {
      state.points = payload
      
    }
  },
  actions: {
    filterRoutes({ commit }, roles) {
      const routes = asyncRoutes.filter((item) => {
        // console.log(item)
        return roles.menus.includes(item.meta.id)
      })
      commit('setRoutes', routes)
      // 动态添加路由规则
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true },
      ])
    },
    setPointsAction({ commit }, payload) {
      console.log(payload);
      commit('setPoints',payload.points)
    }
  },
}
