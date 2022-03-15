import { useRoutes } from 'react-router-dom'
import router from './router'
import classNames from 'classnames'

import useResponsiveLayout from './hooks/useResponsiveLayout'
import useLockPageScrollForMobileOnly from './hooks/useLockPageScrollForMobileOnly'

import {
  Sidebar,
  TopHeader,
  Header,
  Footer
} from './components'
import { Main, Mask } from './app.style'
// import { useState } from 'react'
import hjRequest from './services'

export default function App() {
  const element = useRoutes(router)
  // isShow 控制各元素的显示/隐藏、移动端的滚动锁定
  const { isShow, toggleIsShow } = useResponsiveLayout()
  const onClass = classNames({ 'on': isShow })
  useLockPageScrollForMobileOnly(isShow)

  // // 测试组件用
  // const [one, setOne] = useState(false)
  return (
    <div>
      {/* <button onClick={() => {setOne(!one)}}>切换one: {one.toString()}</button> */}
      <Sidebar isShow={isShow} />
      <Main className={onClass}>
        <button
          onClick={() => {
            hjRequest.get({
              url: '/article/111'
            }).then(data => {
              console.log('成功', data)
            }).catch(err => {
              console.log('失败', err)
            })
          }}
        >请求</button>
        <TopHeader toggleIsShow={toggleIsShow} />
        <Header />
        {/* 注册路由(页面主体) */}
        <div className="content"> {element}</div>
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
