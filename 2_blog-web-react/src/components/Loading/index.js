import React, { memo, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'

import eventBus from '../../utils/eventBus'

const Loading = memo(() => {
  // 正在进行 count 次网络请求
  const [count, setCount] = useState(0)
  // 需要使用该 hook 抢在网络请求前监听事件，
  // 以在首次加载页面时正确显示loading
  useLayoutEffect(() => {
    eventBus.on('countChange', setCount)
  }, [])

  const isShow = count > 0
  return (
    <LoadingWrapper isShow={isShow} />
  )
})

const LoadingWrapper = styled.div`
  @keyframes loading {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%);
    }
  }
  position: fixed;
  width: 100%;
  height: 3px;
  top: 0;
  left: -100%;
  z-index: 99999;
  background-color: #ff4081;
  animation-name: ${props => props.isShow ? 'loading' : ''};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`

export default Loading