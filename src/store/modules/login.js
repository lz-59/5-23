import { FETCH_LOGIN, FETCH_LOGIN_ACTION } from '@/constants/actionTypes'
import { login } from '@/api'

export default {
  namespaced: true,
  state: {
    isLogin: false,
  },
  mutations: {
    [FETCH_LOGIN] (state, action) {
      if(Number(action) === 200){
        state.isLogin = true
        alert('登录成功')
      }else{
        alert('登录失败')
      }
    },
  },
  actions: {
    [FETCH_LOGIN_ACTION] ({ commit }, option) {
      login(option)
        .then(res => {
          commit('FETCH_LOGIN', res.data.code)
        })
    }
  },
}