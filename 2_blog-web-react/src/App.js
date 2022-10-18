import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import router from './router'
import classNames from 'classnames'

import { Toaster } from 'react-hot-toast'
import { useIsShowContext } from './context/IsShow-context'

import {
  Sidebar,
  TopHeader,
  Footer,
  GoTopBtn,
  Loading,
} from './components'
import { Main, Mask } from './app.style'
import LoadingLazy from './components/LoadingLazy'

export default function App() {
  const element = useRoutes(router)

  const { isShow, toggleIsShow } = useIsShowContext() // isShow 控制各元素的显示/隐藏，以及移动端的滚动锁定
  const on = classNames({ 'on': isShow })

  return (
    <div>
      <Sidebar />
      <Main className={on}>
        <TopHeader />
        <div className="content-wrapper">
          <Suspense fallback={<LoadingLazy />}>
            {element}
          </Suspense>
        </div>
        <Footer />
      </Main >
      <GoTopBtn />
      <Mask className={on} onClick={toggleIsShow} /> {/* 中小屏下使用的遮罩 */}
      <Loading />
      <Toaster />
    </div >
  )
}
