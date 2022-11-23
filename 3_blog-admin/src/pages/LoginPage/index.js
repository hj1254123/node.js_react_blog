import React, { memo } from 'react'
import { useAuthContext } from '../../context/auth-context'

const LoginPage = memo(() => {
  const { user, login, logout } = useAuthContext()
  const o = {
    userName: "monkey",
    password: "410526",
  }
  return (
    <div>
      <button onClick={() => login(o)}>登录</button>
      <button onClick={() => logout()}>登出</button>
      <p>
        token:{user?.token}
      </p>
    </div>
  )
})

export default LoginPage