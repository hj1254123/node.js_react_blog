import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useTitleContext } from '../../context/Title-context'
import Header from '../Header'

// **专门给懒加载使用的loading，在APP组件Suspense使用。**
const LoadingLazy = () => {
  // 改一下 title 不让 Header 组件显示 span 的作用
  const { setTitle } = useTitleContext()
  useEffect(() => {
    setTitle('Loading')
  }, [])

  return (
    <LoadingWrapper>
      <div className="loading" />
      <Header isShowTitle={false} />
      <div style={{ height: '90vh' }}></div>
    </LoadingWrapper>
  )
}

const LoadingWrapper = styled.div`
  .loading {
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
    animation-name: 'loading';
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
`

export default LoadingLazy