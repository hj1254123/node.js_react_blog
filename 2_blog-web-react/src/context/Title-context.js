import React, { useState } from 'react'

const TitleContext = React.createContext()

export const TitleProvider = ({ children }) => {
  const [title, setTitle] = useState("HouJi's Blog")

  return (
    <TitleContext.Provider
      value={{ title, setTitle }}
    >
      {children}
    </TitleContext.Provider>
  )
}

// 两个 header 组件会用到 title
// sidebar 组件用 setTitle 替换 title
export const useTitleContext = () => {
  const context = React.useContext(TitleContext)
  if(!context) {
    throw new Error("useTitleContext必须在TitleProvider中使用")
  }
  return context
}