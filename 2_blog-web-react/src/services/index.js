import HjRequest from './request'
import { BASE_URL, TIMEOUT } from './request/config'

// 用 ts 会好很多，等以后再封装。
// 在某些项目中，可能需要请求多个服务器。
// - 对于配置相同的部分，就写在类里（全局配置）
// - 对于配置不同的部分，通过实例来解决（实例配置）
// - 对于针对某一个方法的配置，直接写在方法内（方法配置）
const hjRequest = new HjRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  // 实例拦截器
  // - 比如只有这个服务器需要带token，可以写在这。
  // - 如果全局都需要，那么写在类里面，这样所有实例都具备。
  interceptors: {
    // requestInterceptor: (config) => {
    //   return config
    // },
    // requestInterceptorCatch: (err) => {
    //   return Promise.reject(err)
    // },
    // responseInterceptor: (res) => {
    //   return res
    // },
    // responseInterceptorCatch: (err) => {
    //   return Promise.reject(err)
    // }
  }
})

// 如果项目需要请求多个服务器，传配置，实例化即可。
// const hjRequest2 = new HjRequest({})

export default hjRequest