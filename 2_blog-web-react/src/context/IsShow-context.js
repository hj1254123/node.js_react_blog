import React from 'react'
import useResponsiveLayout from '../hooks/useResponsiveLayout'
import useLockPageScrollForMobileOnly from '../hooks/useLockPageScrollForMobileOnly'

const IsShowContext = React.createContext()

export const IsShowProvider = ({ children }) => {
  const { isShow, toggleIsShow } = useResponsiveLayout() //isShow 控制各元素的显示/隐藏
  useLockPageScrollForMobileOnly(isShow) //移动端出现遮罩锁定滚动

  return (
    <IsShowContext.Provider
      value={{ isShow, toggleIsShow }}
    >
      {children}
    </IsShowContext.Provider>
  )
}

// 用来拿 isShow, toggleIsShow
// isShow 控制各元素的显示/隐藏，以及移动端的滚动锁定
export const useIsShowContext = () => {
  const context = React.useContext(IsShowContext)
  if(!context) {
    throw new Error("useIsShowContext必须在IsShowProvider中使用")
  }
  return context
}