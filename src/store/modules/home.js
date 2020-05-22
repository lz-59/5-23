import { sdeFault, delData, upData, addData } from '@/api'
import { 
        FETCH_MR,
        FETCH_MR_ACTION,
        FETCH_DEL,
        FETCH_DEL_ACTION,
        FETCH_UPD,
        FETCH_UPD_ACTION,
        FETCH_ADD,
        FETCH_ADD_ACTION,
      } from '@/constants/actionTypes'

export default {
  namespaced: true,
  state: {
    data: [],
    isDel: false,
    isUpd: false,
    isADD: false,
  },
  mutations: {
    [FETCH_MR] (state, action) {
        state.data = action
    },
    [FETCH_DEL] (state, action) {
      if(action === 200){
        state.isDel = true
        alert('删除成功')
      }else{
        alert('删除失败')
      }
    },
    [FETCH_UPD] (state, action) {
      if(action === 200){
        state.isUpd = true
        alert('修改成功')
      }else{
        alert('修改失败')
      }
    },
    [FETCH_ADD] (state, action) {
      if(action === 200){
        state.isADD = true
        alert('添加成功')
      }else{
        alert('添加失败')
      }
    },
  },
  actions: {
    async [FETCH_MR_ACTION] ({ commit }) {
      const res = await sdeFault()
      commit('FETCH_MR', res.data.data)
    },
    async [FETCH_DEL_ACTION] ({ commit, state }, payload) {
      state.isDel = false
      const res = await delData(payload)
      commit('FETCH_DEL', res.data.code)
    },
    async [FETCH_UPD_ACTION] ({ commit, state }, payload) {     
      state.isUpd = false
      const res = await upData(payload)
      commit('FETCH_UPD', res.data.code)
    },
    async [FETCH_ADD_ACTION] ({ commit, state }, payload) {     
      state.isADD = false
      const res = await addData(payload)
      commit('FETCH_ADD', res.data.code)
    },
  },
}
