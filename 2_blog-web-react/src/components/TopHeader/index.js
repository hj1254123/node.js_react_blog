import React, { memo } from 'react'

import { TopHeaderWrapper } from './style'

const TopHeader = memo((props) => {
  const { toggleSidebar } = props
  return (
    <TopHeaderWrapper>
      <button onClick={toggleSidebar}>X</button>
    </TopHeaderWrapper>
  )
})

export default TopHeader