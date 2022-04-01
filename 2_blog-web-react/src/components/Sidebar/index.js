import React, { memo } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useMedia } from 'react-use'

import { MaxWidth1240px } from '../../common/constant'
import { useIsShowContext } from '../../context/IsShow-context'
import avatarImg from '../../assets/img/avatar.jpg'

import {
  SlidebarWrapper,
  BrandWrapper,
  NavWrapper
} from './style'

const Sidebar = memo(() => {
  const { isShow, toggleIsShow } = useIsShowContext()

  const isMaxWidth1240px = useMedia(MaxWidth1240px)
  function closeSidebarOnlyMobile() { //仅移动端点击链接关闭侧边栏
    if(isMaxWidth1240px) {
      toggleIsShow()
    }
  }
  return (
    <SlidebarWrapper isShow={isShow}>
      <BrandWrapper>
        <div className="brand">
          <Link to='/' className="avatar" onClick={closeSidebarOnlyMobile}>
            <img src={avatarImg} alt="头像" />
          </Link>
          <address>
            <div className="nickname">猴几</div>
            <a href="mailto:hj1254123@gmail.com" className='mail'>hj1254123@gmail.com</a>
          </address>
        </div>
      </BrandWrapper>
      <NavWrapper>
        <ul>
          <li>
            <NavLink to='/' onClick={closeSidebarOnlyMobile}>
              <i className='iconfont icon-fl-jia'></i>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/archive' onClick={closeSidebarOnlyMobile}>
              <i className='iconfont icon-guidang3'></i>
              Archive
            </NavLink>
          </li>
          <li>
            <NavLink to='/tags' onClick={closeSidebarOnlyMobile}>
              <i className='iconfont icon-24gf-tags'></i>
              Tags
            </NavLink>
          </li>
          <li>
            <a href="https://github.com/hj1254123" target="_blank" rel="noreferrer">
              <i className='iconfont icon-githublogo'></i>
              Github
            </a>
          </li>
        </ul>
      </NavWrapper>
    </SlidebarWrapper>
  )
})

export default Sidebar