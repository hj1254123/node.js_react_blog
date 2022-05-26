import React, { memo, useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'; // markdown解析引擎
import hljs from 'highlight.js'; // 语法高亮支持
import 'highlight.js/styles/github.css';

import { formatDate } from '../../../../utils/my-utils';

import { ArticleWrapper, TOC } from './style'

// 本项目用 highlight 会自动给代码块添加对应语言的 class，
// 这里重写 code，取消markdown-to-jsx添加的无用class属性。
const MyCode = ({ children }) => (<code>{children}</code>)

const Article = memo((props) => {
  const { articleData, tocData } = props

  // 代码高亮
  useEffect(() => {
    hljs.highlightAll()
  }, [])

  // 根据滚动距离，调整样式
  const [fixedTOC, setFixedTOC] = useState(false)
  const fixedTOCClass = fixedTOC ? 'fixed' : ''

  // 根据滚动位置决定 fixed toc 与否
  useEffect(() => {
    function handler() {
      const y = document.documentElement.scrollTop || document.body.scrollTop
      setFixedTOC(y >= 280)
    }
    window.addEventListener('scroll', handler)
    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [])

  function renderTOC(tocData) {
    return <ul>
      {
        tocData.map(item => {
          return <li key={item.props.key}>
            <a href={'#' + item.props.id}>{item.content}</a>
            {
              item.children.map(item2 => {
                return <ul>
                  <li key={item2.props.key}>
                    <a href={'#' + item2.props.id}>{item2.content}</a>
                  </li>
                </ul>
              })
            }
          </li>
        })
      }
    </ul>
  }

  return (
    <ArticleWrapper>
      <article className='markdown-body'>
        <h1>{articleData.title}</h1>
        <time>{formatDate(articleData.time)}</time>
        <Markdown
          children={articleData.content}
          options={{
            forceWrapper: true, //即使只有一个子元素，也包装（本例用div包装）
            slugify: str => str, //标题元素id='中文'正常处理
            disableParsingRawHTML: true, //转义尖括号<>
            overrides: { // 通过重写code，去掉markdown-to-jsx添加的语言class，交给highlight.js自动添加
              code: MyCode
            }
          }}
        />
      </article>
      <TOC>
        <nav className={fixedTOCClass}>
          <h4>TOC</h4>
          {renderTOC(tocData)}
        </nav>
      </TOC>
    </ArticleWrapper>
  )
})

export default Article