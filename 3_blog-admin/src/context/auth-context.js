import React, { useEffect, useState } from 'react'
import * as auth from '../utils/auth'

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({})
 
  const login = (form) => auth.login(form).then(setUser)

  return (
    <AuthContext.Provider
      value={{user, login}}
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