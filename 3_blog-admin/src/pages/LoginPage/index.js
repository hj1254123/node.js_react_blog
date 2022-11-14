import React, { memo } from 'react'
import { useAuthContext } from '../../context/auth-context'

const LoginPage = memo(() => {
  const { user, login } = useAuthContext()
  const o = {
    userName: "monkey",
    password: "410526"
  }
  return (
    <div>
      <button onClick={() => login(o)}>请求用户数据</button>
      <p>
        token:{user?.token}
      </p>
    </div>
  )
})

export default LoginPage