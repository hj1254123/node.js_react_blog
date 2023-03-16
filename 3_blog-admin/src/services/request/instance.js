import { message } from 'antd'
import axios from 'axios'
import { getUser, logout } from '../../utils/auth'
import { BASE_URL, TIMEOUT } from './config'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 添加token
  const token = getUser()?.token
  config.headers.Authorization = token ? `Bearer ${token}` : ""
  return config
}, err => {
  return Promise.reject(err)
})

// 实例响应拦截器
instance.interceptors.response.use(res => {
  return res.data
}, err => { //超出200的状态码会在这里执行
  // console.log(err)
  if(err.response.status === 401) {
    const user = getUser()
    if(user?.userName === '演示账号') {
      message.error('演示账号，无法操作！')
      return
    } else {
      message.error('登录已过期，请重新登录')
      logout() // 删除localStorage中的用户数据
      window.location.reload()
    }
  }
  return Promise.reject({
    data: err.response.data,
    status: err.response.status,
    statusText: err.response.statusText
  })
})

export default instance
