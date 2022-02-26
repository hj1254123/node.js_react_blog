import React, { memo } from 'react'

import { TopHeaderWrapper } from './style'

const TopHeader = memo((props) => {
  const { togglePage } = props
  return (
    <TopHeaderWrapper>
      <button onClick={togglePage}>X</button>
    </TopHeaderWrapper>
  )
})

export default TopHeader