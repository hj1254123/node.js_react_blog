import React, { memo, useEffect, useState } from 'react'
import classnames from 'classnames'

import { useIsShowContext } from '../../context/IsShow-context'
import { useTitleContext } from '../../context/Title-context'
import { throttle } from '../../utils/my-utils'

import { TopHeaderWrapper } from './style'

const TopHeader = memo(() => {
  const { isShow, toggleIsShow } = useIsShowContext()
  const { title } = useTitleContext()

  // 滚动距离Y>80显示阴影和topTitle
  const [isScrollY80, setIsScrollY80] = useState(false)
  useEffect(() => {
    function handler() {
      const y = document.documentElement.scrollTop || document.body.scrollTop
      setIsScrollY80(y > 80)
    }
    window.addEventListener('scroll', throttle(handler, 17))
  }, [])

  const fixed = classnames({ 'fixed': isScrollY80 })

  return (
    <TopHeaderWrapper isShow={isShow} className={fixed}>
      <div className='top-button'>
        <button className='iconfont icon-weibiaoti12' onClick={toggleIsShow} ></button>
        <button className='iconfont icon-cha1' onClick={toggleIsShow} ></button>
      </div>
      <div className='top-title'>
        <span>{isScrollY80 ? title : ''}</span>
      </div>
    </TopHeaderWrapper>
  )
})

export default TopHeader