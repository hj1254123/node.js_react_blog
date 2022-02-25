import React, { useState, useCallback, useEffect } from 'react'
import { useMedia } from 'react-use'
import { useRoutes } from 'react-router-dom'
import router from './router'
import {
  Sidebar,
  TopHeader,
  Header,
  Footer
} from './components'

import { CSSTransition } from 'react-transition-group'

import {
  Main
} from './app.style'

export default function App() {
  // 控制侧边栏和main左移
  const [toggle, setToggle] = useState(true)
  const toggleSidebar = useCallback(() => {
    setToggle(!toggle)
  }, [toggle])

  // 媒体查询，做响应式页面
  const isMaxWidth1240px = useMedia('(max-width: 1240px)')
  const isMaxWidth760px = useMedia('(max-width: 760px)')
  useEffect(() => {
    // 大屏
    if(!isMaxWidth1240px && !isMaxWidth760px) {
      setToggle(true)
    }
    // 中屏
    if(isMaxWidth1240px && !isMaxWidth760px) {
      setToggle(false)
    }
    // 小屏
    if(isMaxWidth1240px && isMaxWidth760px) {
      setToggle(false)
    }
  }, [isMaxWidth1240px, isMaxWidth760px])
  
  // 通过路由表注册路由
  const element = useRoutes(router)
  return (
    <div>
      <Sidebar toggle={toggle} />
      <CSSTransition
        in={toggle}
        timeout={500}
        classNames='main-move'
      >
        <Main>
          <TopHeader
            toggleSidebar={toggleSidebar}
          >
          </TopHeader>
          <Header></Header>
          {element}
          <Footer></Footer>
        </Main>
      </CSSTransition>

    </div>
  )
}
