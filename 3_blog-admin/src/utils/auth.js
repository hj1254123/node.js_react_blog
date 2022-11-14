import { message } from "antd"
import hjRequest from "../services/request"

export const login = ({ userName, password }) => {
  return hjRequest
    .post('/auth/login', { userName, password })
    .then(data => {
      if(data?.message === '登录成功') {
        message.success(data?.message || '未知错误')
        return data.data
      } else {
        return Promise.reject(data)
      }
    })
    .catch(err => {
      message.error(err?.message || '未知错误')
    })
}