import { login, getUserInfo, userAllInfo } from '@/api'
import {setTokenTime} from '@/utils/auth'
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
    // 登录
    async getToken({ commit }, payload) {
      const res = await login(payload)
      console.log(res)
      commit('setToken', res)
      setTokenTime()
    },
    // 获取员工信息
    async getUserInfo({ commit }) {
      const userInfo = await getUserInfo()
      const userInbaseInfo = await userAllInfo(userInfo.userId)
      console.log(userInfo) //员工信息
      console.log(userInbaseInfo) //员工基本信息
      commit('setUserInfo', { ...userInfo, ...userInbaseInfo })
    },
    // 退出
    logout({commit}) {
      commit('setToken', '')
      commit('setUserInfo',{})
    }
  },
}
