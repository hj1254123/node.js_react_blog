import { useState, useCallback, useEffect } from 'react'
import { useMedia } from 'react-use'

export default function usePageLayoutSwitch() {

  // 媒体查询，控制大屏与中小屏的排版逻辑
  const isMaxWidth1240px = useMedia('(max-width: 1240px)')
  // 控制页面整体是否移动
  const [toggle, setToggle] = useState(true)
  // 仅控制Main在中小屏不移动
  const [mainToggle, setMainToggle] = useState(true)
  // 控制遮罩
  const [ismask, setIsmask] = useState(false)
  // 切换页面各个区块，显示/隐藏
  const togglePage = useCallback(() => {
    // 切换侧边栏
    setToggle(!toggle)
    // 仅大屏才移动Main
    if(!isMaxWidth1240px) {
      setMainToggle(!toggle)
    }
    // 这中小屏切换遮罩
    if(isMaxWidth1240px) {
      setIsmask(!ismask)
    }
  }, [toggle, isMaxWidth1240px, ismask])

  // 窗口尺寸变化，自动切换各个区块
  useEffect(() => {
    // 大屏
    if(!isMaxWidth1240px) {
      setToggle(true)
      setMainToggle(true)
      setIsmask(false)
    }
    // 中小屏
    if(isMaxWidth1240px) {
      setToggle(false)
      setMainToggle(false)
    }

  }, [isMaxWidth1240px])

  return {
    toggle,
    setToggle,
    mainToggle,
    setMainToggle,
    ismask,
    setIsmask,
    togglePage,
  }
}