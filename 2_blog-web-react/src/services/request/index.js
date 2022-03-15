import axios from 'axios'

class HjRequest {
  constructor(config) {
    this.instance = axios.create(config)

    // 1.实例拦截器（可不传）
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    )

    // 2.全局拦截器
    this.instance.interceptors.request.use(config => {
      return config
    }, err => {
      return Promise.reject(err)
    })
    this.instance.interceptors.response.use(res => {
      return res.data
    }, err => {
      // 超出200的状态码会在这里执行
      console.dir(err)
      switch(err.response.status) {
        case 404:
          console.log('404错误')
          break
        default:
          console.log('未知错误')
      }
      return Promise.reject(err)
    })
  }
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  get(config) {
    return this.request({ ...config, method: 'get' })
  }
  post(config) {
    return this.request({ ...config, method: 'post' })
  }
  delete(config) {
    return this.request({ ...config, method: 'delete' })
  }
  put(config) {
    return this.request({ ...config, method: 'put' })
  }
}

export default HjRequest