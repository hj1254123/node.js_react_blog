import { useRoutes } from 'react-router-dom'
import router from './router'
import classNames from 'classnames'

import useResponsiveLayout from './hooks/useResponsiveLayout'

import {
  Sidebar,
  TopHeader,
  Header,
  Footer
} from './components'
import { Main, Mask } from './app.style'

export default function App() {
  // 路由表
  const element = useRoutes(router)
  // isShow 控制元素显示隐藏
  const { isShow, toggleIsShow } = useResponsiveLayout()
  const onClass = classNames({ 'on': isShow })
  return (
    <div>
      <Sidebar isShow={isShow} />
      <Main className={onClass}>
        <TopHeader toggleIsShow={toggleIsShow} />
        <Header />
        {/* 注册路由(页面主体) */}
        {element}
        <Footer />
      </Main >
      {/* 中小屏下使用的遮罩 */}
      <Mask
        className={onClass}
        onClick={toggleIsShow}
      />
    </div>
  )
}
