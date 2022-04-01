import React, { memo, useEffect, useState } from 'react'
import classnames from 'classnames'

import { useIsShowContext } from '../../context/IsShow-context'
import { throttle } from '../../utils/my-utils'
import { TopHeaderWrapper } from './style'

const TopHeader = memo((props) => {
  const { isShow, toggleIsShow } = useIsShowContext()
  const topTitle = props.topTitle || '猴几的blog'

  // 滚动距离Y>56显示阴影和topTitle
  const [y, setY] = useState(0)
  useEffect(() => {
    function handler() {
      const y = document.documentElement.scrollTop || document.body.scrollTop
      setY(y)
    }
    window.addEventListener('scroll', throttle(handler, 400))
  }, [])
  const isScrollY56 = (y > 56)
  const fixed = classnames({ 'fixed': isScrollY56 })

  // 控制菜单与关闭 icon 的切换
  const iconClass = classnames({
    iconfont: true,
    'icon-weibiaoti12': !isShow,
    'icon-cha1': isShow,
  })

  return (
    <TopHeaderWrapper isShow={isShow} className={fixed}>
      <button className={iconClass} onClick={toggleIsShow} ></button>
      <div>{isScrollY56 ? topTitle.toString() : ''}</div>
    </TopHeaderWrapper>
  )
})

export default TopHeader