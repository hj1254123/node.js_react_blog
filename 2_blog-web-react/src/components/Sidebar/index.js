import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { useMedia } from 'react-use'
import { MaxWidth1240px } from '../../common/constant'
import { useIsShowContext } from '../../context/IsShow-context'


import {
  SlidebarWrapper,
} from './style'

const Sidebar = memo(() => {
  const { isShow, toggleIsShow } = useIsShowContext()
  const isMaxWidth1240px = useMedia(MaxWidth1240px)

  function closeSidebarOnlyMobile() {
    if(isMaxWidth1240px) {
      toggleIsShow()
    }
  }
  return (
    <SlidebarWrapper isShow={isShow}>
      <NavLink to='/' onClick={closeSidebarOnlyMobile}>home</NavLink>
      <NavLink to='/archive' onClick={closeSidebarOnlyMobile}>archive</NavLink>
      <NavLink to='/tags' onClick={closeSidebarOnlyMobile}>tags</NavLink>
      <a href="https://github.com/hj1254123" target="_blank">Github</a>
    </SlidebarWrapper>
  )
})

export default Sidebar