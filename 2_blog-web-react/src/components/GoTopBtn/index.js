import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { goTop, throttle } from '../../utils/my-utils'

export default function GoTopBtn() {
  const [isshow, setIsshow] = useState(false)
  useEffect(() => {
    function handler() {
      const y = document.documentElement.scrollTop || document.body.scrollTop
      setIsshow(y > 500)
    }
    window.addEventListener('scroll', throttle(handler, 34))
  }, [])
  return (
    <GoTopBtnWrapper isshow={isshow}>
      <button onClick={goTop} className='iconfont icon-icon3'></button>
    </GoTopBtnWrapper>
  )
}

const GoTopBtnWrapper = styled.div`
  position: fixed;
  width: 56px;
  height: 56px;
  line-height: 56px;
  text-align: center;
  right: 16px;
  bottom: 30px;
  z-index: 88;
  transition: all .4s;
  transform: ${props => props.isshow ? 'translateX(0)' : 'translateX(80px)'};
  button {
    display: inline-block;
    color: #fff;
    font-size: 18px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #ff4081;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    cursor: pointer;
  }

  @media screen and (max-width: 760px){
    width: 40px;
    height: 40px;
    line-height: 40px;
    button {
      font-size: 12px;
    }
  }
`
