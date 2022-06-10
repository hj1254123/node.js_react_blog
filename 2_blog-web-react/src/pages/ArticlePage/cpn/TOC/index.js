import React, { memo } from 'react'

import { TOCWrapper } from './style'

const TOC = memo(({ data }) => {
  const { tocData, activeTitleID, fixedTOCClass } = data

  function renderTOC(tocData, activeTitleID) {
    return <ul className='toc-list'>
      {
        tocData.map(item => {
          // 是否高亮h2对应的导航栏
          const activeH2 = item.props.id === activeTitleID ? 'active' : ''
          return <li key={item.props.key}>
            <a href={'#' + item.props.id} className={activeH2}>{item.content}</a>
            {
              // 渲染二级目录
              item.children.length !== 0 && (
                <ul>
                  {
                    item.children.map(item2 => {
                      // 是否高亮h3对应的导航栏
                      const activeH3 = item2.props.id === activeTitleID ? 'active' : ''
                      return <li key={item2.props.id}>
                        <a href={'#' + item2.props.id} className={activeH3}>{item2.content}</a>
                      </li>
                    })
                  }
                </ul>
              )
            }
          </li>
        })
      }
    </ul >
  }

  return (
    <TOCWrapper>
      <nav className={fixedTOCClass} >
        <h4>TOC</h4>
        {renderTOC(tocData, activeTitleID)}
      </nav>
    </TOCWrapper>
  )
})

export default TOC