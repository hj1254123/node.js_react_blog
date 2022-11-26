import React, { memo, useCallback, useState } from 'react'
import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../context/auth-context'
import { saveUser } from '../../utils/auth'

import { LoginWrapper } from './style'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LoginPage = memo(() => {
  const { user, login, logout } = useAuthContext()

  const [pageSwitch, setPageSwitch] = useState('登录')

  const navigate = useNavigate()

  const onLoginFinish = useCallback((values) => {
    console.log('login form: ', values);
  }, [])

  const onRegisterFinish = useCallback((values) => {
    console.log('Register form: ', values);
  }, [])

  const goDirectly = useCallback(() => {
    saveUser('游客') //设置游客账号
    navigate('/home')
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
            ? <LoginForm onLoginFinish={onLoginFinish} setPageSwitch={setPageSwitch} goDirectly={goDirectly} />
            : <RegisterForm onRegisterFinish={onRegisterFinish} setPageSwitch={setPageSwitch} />
        }
      </Card>
    </LoginWrapper>

  )
})



export default LoginPage