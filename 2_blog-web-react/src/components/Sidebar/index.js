import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import {
  SlidebarWrapper,
} from './style'

const Sidebar = memo((props) => {
  const { toggle } = props
  return (
    <CSSTransition
      in={toggle}
      timeout={400}
      classNames='slidebar-move'
    >
      <SlidebarWrapper>
        <NavLink to='/'>home</NavLink>
        <NavLink to='/archive'>archive</NavLink>
        <NavLink to='/tags'>tags</NavLink>
      </SlidebarWrapper>
    </CSSTransition>
  )
})

export default Sidebar