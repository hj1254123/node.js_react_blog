import { useState, useCallback, useEffect } from 'react'
import { useMedia } from 'react-use'

/**
 * 自定义hook，实现响应式布局。
 * 窗口变化会通过js媒体查询，切换样式(切换isShow的状态实现)。
 * isShow 控制页面元素显示隐藏，具体样式在组件对应的css中指定。
 */
export default function useResponsiveLayout() {
  // 媒体查询，控制大屏与中小屏的排版逻辑
  const isMaxWidth1240px = useMedia('(max-width: 1240px)')
  // 控制页面整体是否移动
  const [isShow, setIsShow] = useState(true)

  // 通过 isShow 控制页面元素的显示/隐藏
  const toggleIsShow = useCallback(() => {
    setIsShow(!isShow)
  }, [isShow])

  // 窗口尺寸变化，自动切换大/中小屏
  useEffect(() => {
    // 大屏
    if(!isMaxWidth1240px) {
      setIsShow(true)
    }
    // 中小屏
    if(isMaxWidth1240px) {
      setIsShow(false)
    }
  }, [isMaxWidth1240px])

  return {
    isShow,
    toggleIsShow,
  }
}