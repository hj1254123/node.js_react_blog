import React, { memo, useEffect, useState } from 'react'
import classnames from 'classnames'

import { useIsShowContext } from '../../context/IsShow-context'
import { throttle } from '../../utils/my-utils'
import { TopHeaderWrapper } from './style'

const TopHeader = memo((props) => {
  console.log('top-header')
  const { isShow, toggleIsShow } = useIsShowContext()
  const topTitle = props.topTitle || '猴几的blog'

  // 滚动距离Y>80显示阴影和topTitle
  const [y, setY] = useState(0)
  useEffect(() => {
    function handler() {
      const y = document.documentElement.scrollTop || document.body.scrollTop
      setY(y)
    }
    window.addEventListener('scroll', throttle(handler, 30))
  }, [])

  const isScrollY56 = (y > 80)
  const fixed = classnames({ 'fixed': isScrollY56 })



  return (
    <TopHeaderWrapper isShow={isShow} className={fixed}>
      <button className='iconfont icon-weibiaoti12' onClick={toggleIsShow} ></button>
      <button className='iconfont icon-cha1' onClick={toggleIsShow} ></button>
      <div>{isScrollY56 ? topTitle.toString() : ''}</div>
    </TopHeaderWrapper>
  )
})

export default TopHeader