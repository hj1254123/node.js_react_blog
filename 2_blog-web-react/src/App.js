import { useRoutes } from 'react-router-dom'
import router from './router'
import classNames from 'classnames'

import { useIsShowContext } from './context/IsShow-context'

import {
  Sidebar,
  TopHeader,
  Header,
  Footer
} from './components'
import { Main, Mask } from './app.style'

export default function App() {
  const element = useRoutes(router)
  const { isShow, toggleIsShow } = useIsShowContext() // isShow 控制各元素的显示/隐藏，以及移动端的滚动锁定
  const on = classNames({ 'on': isShow })
  return (
    <div>
      <Sidebar />
      <Main className={on}>
        <TopHeader />
        <Header />
        <div className="content-wrapper">
          <div className="content">
            {element}  {/* 注册路由(页面主体) */}
          </div>
        </div>
        <Footer />
      </Main >
      <Mask className={on} onClick={toggleIsShow} /> {/* 中小屏下使用的遮罩 */}
    </div>
  )
}
