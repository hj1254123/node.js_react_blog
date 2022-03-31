import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function Error404() {
  return (
    <Error404Wrapper >
      <h1>404</h1>
      <h2>你要找的页面不存在</h2>
      <div>
        <Link to='/'>点击返回主页</Link>
      </div>
    </Error404Wrapper>
  )
}

const Error404Wrapper = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background-color: black;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 60px;
    margin-bottom: 10px;
  }

  div {
    margin-top: 20px;
  }
`
