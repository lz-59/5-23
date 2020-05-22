import request from '@/utils/request'
import api from '@/services/api'
import qs from 'qs'

export const sdeFault = () => request.get(api.sdeFault)
export const login = obj => request.post(api.signUp, qs.stringify(obj))
export const addData = obj => request.post(api.addData, qs.stringify(obj))
export const upData = obj => request.post(api.upData, qs.stringify(obj))
export const delData = obj => request.post(api.delData, qs.stringify(obj))