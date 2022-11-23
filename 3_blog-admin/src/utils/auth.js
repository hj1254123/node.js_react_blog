import { message } from "antd"
import hjRequest from "../services/request"

const authTokenKey = '__auth_token_key__'

const saveUser = (user) => {
  window.localStorage.setItem(authTokenKey, JSON.stringify(user) || '')
  return user
}

export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(authTokenKey))
}

export const login = ({ userName, password }) => {

  return hjRequest
    .post('/auth/login', { userName, password })
    .then(data => {
      if(data?.message === '登录成功') {
        message.success(data?.message)
        return saveUser(data.data)
      } else {
        return Promise.reject(data)
      }
    })
    .catch(err => {
      message.error(err?.message || '未知错误')
    })
}

export const logout = async () => {
  window.localStorage.removeItem(authTokenKey)
}

export const register = ({ userName, password, invitationCode }) => {
  return hjRequest
    .post('/auth/register', { userName, password, invitationCode })
    .then(data => {
      if(data?.message === '注册成功') {
        message.success(data?.message)
        return saveUser(data.data)
      } else {
        return Promise.reject(data)
      }
    })
    .catch(err => {
      message.error(err?.message || '未知错误')
    })
}
