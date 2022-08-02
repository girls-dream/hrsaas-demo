import { login, getUserInfo, userAllInfo } from '@/api'

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    async getToken({ commit }, payload) {
      const res = await login(payload)
      console.log(res)
      commit('setToken', res)
    },
    async getUserInfo({ commit }) {
      const userInfo = await getUserInfo()
      const userInbaseInfo = await userAllInfo(userInfo.userId)
      console.log(userInfo) //员工信息
      console.log(userInbaseInfo) //员工基本信息
      commit('setUserInfo', { ...userInfo, ...userInbaseInfo })
      // setTimeout(() => {
      //   const res = {
      //     name: '张三',
      //   }
      //   console.log(res);
      // }, 1000)
    },
  },
}
