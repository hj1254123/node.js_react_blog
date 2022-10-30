import { useState, useCallback, useEffect } from 'react'
import { useMedia } from 'react-use'
import { LargeScreenWidth } from '../common/constant'

/**
 * 自定义hook，实现响应式布局。
 * 窗口变化会通过js媒体查询，切换样式(切换isShow的状态实现)。
 * isShow 控制页面元素显示隐藏，具体样式在组件对应的css中指定。
 */
export default function useResponsiveLayout() {
  // 媒体查询，控制大屏与中小屏的排版逻辑
  const isLargeScreenWidth = useMedia(LargeScreenWidth)
  // 控制页面整体是否移动；初始值是为了大屏默认显示侧边栏、中小屏反之
  const [isShow, setIsShow] = useState(() => (isLargeScreenWidth ? false : true))

  // 通过 isShow 控制页面元素的显示/隐藏
  const toggleIsShow = useCallback(() => {
    setIsShow(!isShow)
  }, [isShow])

  // 窗口尺寸变化，自动切换大/中小屏
  useEffect(() => {
    // 大屏
    if(!isLargeScreenWidth) {
      setIsShow(true)
    }
    // 中小屏
    if(isLargeScreenWidth) {
      setIsShow(false)
    }
  }, [isLargeScreenWidth])

  return {
    isShow,
    toggleIsShow,
  }
}