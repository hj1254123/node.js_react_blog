import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import {
  SlidebarWrapper,
} from './style'

const Sidebar = memo((props) => {
  const { isShow } = props
  return (
    <SlidebarWrapper isShow={isShow}>
      <NavLink to='/'>home</NavLink>
      <NavLink to='/archive'>archive</NavLink>
      <NavLink to='/tags'>tags</NavLink>
    </SlidebarWrapper>
  )
})

export default Sidebar