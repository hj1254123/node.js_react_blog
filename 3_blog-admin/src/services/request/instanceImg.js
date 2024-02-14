// import axios from 'axios'
// import { imageHosting_URL, TIMEOUT } from './config'

// const instanceImg = axios.create({
//   baseURL: imageHosting_URL,
//   timeout: TIMEOUT,
// })

// // 请求拦截器
// instanceImg.interceptors.request.use(config => {
//   // 添加token
//   config.headers.Authorization = ``
//   return config
// }, err => {
//   return Promise.reject(err)
// })

// // 实例响应拦截器
// instanceImg.interceptors.response.use(res => {
//   return res.data
// }, err => { //超出200的状态码会在这里执行
//   console.log(err)
//   return Promise.reject({
//     message: err.message,
//   })
// })

// export default instanceImg
