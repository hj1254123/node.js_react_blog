import React, { memo, useCallback, useState } from 'react'
import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../context/auth-context'
import { saveUser } from '../../utils/auth'

import { LoginWrapper } from './style'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LoginPage = memo(() => {
  const [pageSwitch, setPageSwitch] = useState('登录')
  const navigate = useNavigate()
  const { login, register, setDemoUser } = useAuthContext()

  const goDirectly = useCallback(() => { // 通过演示账号直接进入管理页面
    setDemoUser()
    navigate('/home')
  }, [])

  const onLoginFinish = useCallback((values) => {
    const { username, password, remember } = values
    login({
      userName: username,
      password,
      remember
    }).then(() => {
      navigate('/home')
    })
  }, [])

  const onRegisterFinish = useCallback((values) => {
    const { username, password, invitationCode, remember } = values
    register({
      userName: username,
      password,
      invitationCode,
      remember
    }).then(() => {
      navigate('/home')
    })
  }, [])


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
              goDirectly={goDirectly} />
            : <RegisterForm
              onRegisterFinish={onRegisterFinish}
              setPageSwitch={setPageSwitch} />
        }
      </Card>
    </LoginWrapper>

  )
})



export default LoginPage