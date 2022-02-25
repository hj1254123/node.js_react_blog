import React, { memo } from 'react'

import { HeaderWrapper } from './style'

const Header = memo(() => {
  console.log('header')
  return (
    <HeaderWrapper>Header</HeaderWrapper>
  )
})

export default Header