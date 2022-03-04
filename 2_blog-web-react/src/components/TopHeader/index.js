import React, { memo } from 'react'

import { TopHeaderWrapper } from './style'

const TopHeader = memo((props) => {
  const { toggleIsShow } = props
  return (
    <TopHeaderWrapper>
      <button onClick={toggleIsShow}>X</button>
    </TopHeaderWrapper>
  )
})

export default TopHeader