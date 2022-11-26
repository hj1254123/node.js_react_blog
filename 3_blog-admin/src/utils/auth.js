import { message } from "antd"
import hjRequest from "../services/request"

const authTokenKey = '__auth_token_key__'

export const saveUser = (user) => {
  window.localStorage.setItem(authTokenKey, JSON.stringify(user) || '')
  return user
}

export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(authTokenKey))
}

export const login = ({ userName, password, remember }) => {

  return hjRequest
    .post('/auth/login', { userName, password })
    .then(data => {
      if(data?.message === '登录成功') {
        message.success(data?.message)
        if(!remember) { //未勾选“记住我”不存储token到本地
          return data.data
        }
        return saveUser(data.data)
      } else {
        return Promise.reject(data)
      }
    })
    .catch(err => {
      message.error(err?.message || '未知错误')
      return Promise.reject('登录出错')
    })
}

export const logout = async () => {
  window.localStorage.removeItem(authTokenKey)
}

export const register = ({ userName, password, invitationCode, remember }) => {
  return hjRequest
    .post('/auth/register', { userName, password, invitationCode })
    .then(data => {
      if(data?.message === '注册成功') {
        message.success(data?.message)
        if(!remember) { //未勾选“记住我”不存储token到本地
          return data.data
        }
        return saveUser(data.data)
      } else {
        return Promise.reject(data)
      }
    })
    .catch(err => {
      message.error(err?.message || '未知错误')
      return Promise.reject('注册出错')
    })
}
