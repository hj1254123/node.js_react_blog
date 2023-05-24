import React from 'react'
import styled from 'styled-components'
import Header from '../Header'

// **专门给懒加载使用的loading，在APP组件Suspense使用。**
const LoadingLazy = () => {

  return (
    <LoadingWrapper>
      <div className="loading" />
      <Header transitionControl={false} />
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