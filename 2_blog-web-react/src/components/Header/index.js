import React, { memo } from 'react'
import { CSSTransition } from 'react-transition-group'

import { useTitleContext } from '../../context/Title-context'

import { HeaderWrapper } from './style'

const Header = memo(({ children, isShowTitle = true }) => {
  const { title } = useTitleContext()
  const isShowSpan = (title === "HouJi's Blog")
  console.log()
  return (
    <HeaderWrapper isShowSpan={isShowSpan}>
      <CSSTransition
        in={true}
        timeout={500}
        classNames='header'
        appear
      >
        <div className="content">
          <h1 style={{visibility: isShowTitle ? '' : 'hidden'}}>
            {title}
          </h1>
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