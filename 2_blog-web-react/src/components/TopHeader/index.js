import React, { memo } from 'react'
import { useIsShowContext } from '../../context/IsShow-context'

import { TopHeaderWrapper } from './style'

const TopHeader = memo(() => {
  const { toggleIsShow } = useIsShowContext()
  return (
    <TopHeaderWrapper>
      <button onClick={toggleIsShow}>x</button>
    </TopHeaderWrapper>
  )
})

export default TopHeader