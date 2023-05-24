import React, { memo } from 'react'
import { CSSTransition } from 'react-transition-group'

import { useTitleContext } from '../../context/Title-context'

import { HeaderWrapper } from './style'

const Header = memo((props) => {
  const {
    children,
    transitionControl = true,
    isShowTitle = true,
    isShowSpan = false
  } = props
  const { title } = useTitleContext()

  return (
    <HeaderWrapper isShowSpan={isShowSpan} isShowTitle={isShowTitle} >
      <CSSTransition
        in={transitionControl}
        timeout={400}
        classNames='header'
        appear
      >
        <div className="content">
          <h1>{title}</h1>
          <span>练习用，暂不运营 ;-)</span>
        </div>
      </CSSTransition>
      {/* 标签页会用到的导航栏 */}
      {children && <div className="solt">
        {children}
      </div>}
    </HeaderWrapper>
  )
})

export default Header