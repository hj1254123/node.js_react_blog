import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import hjRequest from '../services/request';

import * as auth from '../utils/auth'

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  useMount(() => {
    const user = auth.getUser()
    if(!user) {
      navigate('/login')
      return
    }
    // 检查token是否过期
    // （token携带和token过期处理，都封装在axios拦截器里）
    hjRequest.get('/test').then(() => {
      setUser(user) //成功了设置一下user
    })
  })

  const login = (form) => auth.login(form).then(setUser)
  const register = (form) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => {
    setUser(null)
  })
  const setDemoUser = () => {
    const user = { id: 999999, userName: '演示账号', token: '', time: 1669469520696 }
    auth.saveUser(user)
    setUser(user)
  }
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, setDemoUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = React.useContext(AuthContext)
  if(!context) {
    throw new Error("useAuthContext必须在AuthProvider中使用")
  }
  return context
}