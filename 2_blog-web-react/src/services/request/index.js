import axios from 'axios'
import eventBus from '../../utils/eventBus'
import { BASE_URL, TIMEOUT } from './config'


// 如果项目中需要请求多个服务器，多创建几个实例即可。
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

let requestNumber = 0 // 正在请求的数量

class HjRequest {
  constructor(instance) {
    this.instance = instance
    this.interceptors()
  }
  interceptors() {
    const instance = this.instance
    // 实例请求拦截器
    instance.interceptors.request.use(config => {
      // - 请求数加一，并发布出去
      if(config.isLoading) { //如果为false则不计数
        requestNumber++
        eventBus.emit('countChange', requestNumber)
      }
      return config
    }, err => {
      return Promise.reject(err)
    })
    // 实例响应拦截器
    instance.interceptors.response.use(res => {
      // - 请求数减一，并发布出去
      if(res.config.isLoading) {
        requestNumber--
        eventBus.emit('countChange', requestNumber)
      }

      return res.data
    }, err => { //超出200的状态码会在这里执行
      console.dir(err)
      // - 请求数减一，并发布出去
      if(err.config.isLoading) {
        requestNumber--
        eventBus.emit('countChange', requestNumber)
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
  post(url, config = {}) {
    return this.request({ ...config, url, method: 'post' })
  }
  delete(url, config = {}) {
    return this.request({ ...config, url, method: 'delete' })
  }
  put(url, config = {}) {
    return this.request({ ...config, url, method: 'put' })
  }
}

const hjRequest = new HjRequest(instance)

export default hjRequest