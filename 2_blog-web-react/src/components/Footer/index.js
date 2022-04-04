import React, { memo } from 'react'

import {
  FooterWrapper
} from './style'

const Footer = memo(() => {
  return (
    <FooterWrapper>
      <div className="top">
        <span>© 2022-present HouJi. All Rights Reserved.</span>
      </div>
      <div className="bottom">
        <span>本项目使用 React.js + Express 开发</span>
        <span>
          Theme by <a href="https://github.com/yscoder/hexo-theme-indigo" target="_blank" rel="noreferrer">indigo</a>
        </span>
        
      </div>
    </FooterWrapper>
  )
})

export default Footer