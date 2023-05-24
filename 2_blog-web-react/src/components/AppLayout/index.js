import React, { memo } from 'react'
import classNames from 'classnames'

import { useIsShowContext } from '../../context/IsShow-context'

import { Toaster } from 'react-hot-toast'
import { Main, Mask } from './style'
import GoTopBtn from '../GoTopBtn'
import Loading from '../Loading'
import Sidebar from '../Sidebar'
import TopHeader from '../TopHeader'
import Footer from '../Footer'

const AppLayout = memo(({ children }) => {
  const { isShow, toggleIsShow } = useIsShowContext() // isShow 控制各元素的显示/隐藏，以及移动端的滚动锁定
  const on = classNames({ 'on': isShow })

  return (
    <div>
      <Sidebar />
      <Main className={on}>
        <TopHeader />
        <div className="content-wrapper">
          {children}
        </div>
        <Footer />
      </Main >
      <GoTopBtn />
      <Mask className={on} onClick={toggleIsShow} /> {/* 中小屏下使用的遮罩 */}
      <Loading />
      <Toaster />
    </div>
  )
})

export default AppLayout