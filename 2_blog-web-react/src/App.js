import { useRoutes } from 'react-router-dom'
import router from './router'
import usePageLayoutSwitch from './hooks/usePageLayoutSwitch'

import { CSSTransition } from 'react-transition-group'
import {
  Sidebar,
  TopHeader,
  Header,
  Footer
} from './components'
import { Main, Mask } from './app.style'

export default function App() {
  // 通过路由表注册路由
  const element = useRoutes(router)

  // 响应式布局，侧边栏、Main、遮罩逻辑。
  const {
    toggle,     // 控制页面整体移动
    setToggle,
    togglePage, // 每次调用，根据页面尺寸切换（侧边栏、Main、遮罩）
    mainToggle, // 控制 Main 是否移动（中小屏不移动）
    ismask,     // 控制遮罩是否显示
    setIsmask,
  } = usePageLayoutSwitch()


  return (
    <div>
      <Sidebar toggle={toggle} />
      <CSSTransition
        in={mainToggle}
        timeout={500}
        classNames='main-move'
      >
        <Main>
          <TopHeader togglePage={togglePage} />
          <Header />
          {/* 注册路由(页面主体) */}
          {element}
          <Footer />
        </Main>
      </CSSTransition>
      {/* 中小屏下使用的遮罩 */}
      <Mask
        onClick={() => {
          setIsmask(!ismask)
          setToggle(!toggle)
        }}
        className={ismask ? 'on' : ''}
      />
    </div>
  )
}
