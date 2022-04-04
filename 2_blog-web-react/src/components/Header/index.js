import React, { memo } from 'react'

import { HeaderWrapper } from './style'

const Header = memo(() => {
  return (
    <HeaderWrapper>
      <div className="content">
        <h1>HouJi's Blog</h1>
        <span>练习用，暂不运营 ;-)</span>
      </div>
    </HeaderWrapper>
  )
})

export default Header