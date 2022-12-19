import React, { memo, useCallback, useState } from 'react'
import { Card, message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../context/auth-context'

import { LoginWrapper } from './style'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LoginPage = memo(() => {
  const [pageSwitch, setPageSwitch] = useState('登录')
  const [loading, setLoading] = useState(false)
  const goPath = '/dashboard'

  const navigate = useNavigate()
  const { login, register, setDemoUser } = useAuthContext()
  

  const goDirectly = useCallback(() => { // 通过演示账号直接进入管理页面
    setDemoUser()
    message.info('正在使用演示账号，部分功能受限！')
    navigate(goPath)
  }, [setDemoUser, navigate])

  const onLoginFinish = useCallback((values) => {
    setLoading(true)
    const { username, password, remember } = values
    login({
      userName: username,
      password,
      remember
    }).then(() => {
      navigate(goPath)
    }).catch(() => {
      setLoading(false)
    })
}, [login, navigate])

const onRegisterFinish = useCallback((values) => {
  setLoading(true)
  const { username, password, invitationCode, remember } = values
  register({
    userName: username,
    password,
    invitationCode,
    remember
  }).then(() => {
    navigate(goPath)
  }).catch(() => {
    setLoading(false)
  })
}, [register, navigate])


return (
  <LoginWrapper>
    <Card
      title={pageSwitch}
      bordered={false}
      style={{
        width: 360,
      }}
    >
      {
        pageSwitch === '登录'
          ? <LoginForm
            onLoginFinish={onLoginFinish}
            setPageSwitch={setPageSwitch}
            goDirectly={goDirectly}
            loading={loading} />
          : <RegisterForm
            onRegisterFinish={onRegisterFinish}
            setPageSwitch={setPageSwitch}
            loading={loading} />
      }
    </Card>
  </LoginWrapper>

)
})



export default LoginPage