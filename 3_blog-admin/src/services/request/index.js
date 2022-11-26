import { message } from 'antd'
import axios from 'axios'
import { getUser, logout } from '../../utils/auth'
import { BASE_URL, TIMEOUT } from './config'

// 如果项目中需要请求多个服务器，多创建几个实例即可。
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,

})

class HjRequest {
  constructor(instance) {
    this.instance = instance
    this.interceptors()
  }
  interceptors() {
    const instance = this.instance
    // 实例请求拦截器
    instance.interceptors.request.use(config => {
      // 添加token
      const token = getUser().token
      config.headers.Authorization = token ? `Bearer ${token}` : ""
      return config
    }, err => {
      return Promise.reject(err)
    })
    // 实例响应拦截器
    instance.interceptors.response.use(res => {
      return res.data
    }, err => { //超出200的状态码会在这里执行
      console.log(err)
      if(err.response.status === 401) {
        const user = getUser()
        if(user === '游客') {
          message.error('游客账号，无法操作！')
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
  }
  request(config) {
    return this.instance.request(config)
  }
  get(url, config = {}) {
    // 不传默认true
    if(config.isLoading === undefined) {
      config.isLoading = true
    }
    return this.request({ ...config, url, method: 'get' })
  }
  post(url, data = {}, config = {}) {
    return this.request({ ...config, data, url, method: 'post' })
  }
  delete(url, config = {}) {
    return this.request({ ...config, url, method: 'delete' })
  }
  put(url, data = {}, config = {}) {
    return this.request({ ...config, data, url, method: 'put' })
  }
}

const hjRequest = new HjRequest(instance)

export default hjRequest