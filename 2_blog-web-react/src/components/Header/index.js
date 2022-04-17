import React, { memo } from 'react'
import { useTitleContext } from '../../context/Title-context'

import { HeaderWrapper } from './style'

const Header = memo(() => {
  const { title } = useTitleContext()
  const isShowSpan = title === "HouJi's Blog"
  return (
    <HeaderWrapper isShowSpan={isShowSpan}>
      <div className="content">
        <h1>{title}</h1>
        <span>练习用，暂不运营 ;-)</span>
      </div>
    </HeaderWrapper>
  )
})

export default Header