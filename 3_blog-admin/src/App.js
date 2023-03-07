import React from 'react'
import { useRoutes } from 'react-router-dom'

import router from './router'
import AppLayout from './components/AppLayout'
import LoginPage from './pages/LoginPage'

import { getUser } from './utils/auth'

const App = () => {
  const element = useRoutes(router)
  if(!getUser()) return <LoginPage /> //没有用户数据渲染登录页
  return (
    <AppLayout>
      {element}
    </AppLayout>
  )
}

export default App