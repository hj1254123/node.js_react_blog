import React, { memo, useEffect, useRef, useState } from 'react'
import Markdown from 'markdown-to-jsx'; // markdown解析引擎
import hljs from 'highlight.js'; // 语法高亮支持
import 'highlight.js/styles/github.css';

import { formatDate, throttle } from '../../../../utils/my-utils';

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

  // toc 
  // 根据滚动距离，调整样式
  //   - 是否 fixed toc
  const [fixedTOC, setFixedTOC] = useState(false)
  const fixedTOCClass = fixedTOC ? 'fixed' : ''
  //   - 根据滚动位置，高亮对应导航栏
  const articleRef = useRef()
  const [activeTitleID, setActiveTitleID] = useState('')

  useEffect(() => {
    // 包含文章h2、h3元素列表
    const list = articleRef.current && articleRef.current.querySelectorAll('h2,h3')
    // 设置需要被高亮的标题id
    function activeTitleFn() {
      if(list.length === 0) return // 为空跳过
      for(const e of list) {
        const { y } = e.getBoundingClientRect()
        if(y >= 0) {
          setActiveTitleID(e.id)
          return
        }
      }
      // 都为负数高亮最后一个
      setActiveTitleID(list[list.length - 1].id)
    }

    activeTitleFn() //初始化调用一次

    // *主函数
    const handler = throttle(function() {
      const y = document.documentElement.scrollTop || document.body.scrollTop
      setFixedTOC(y >= 275) //决定是否fixedTOC
      activeTitleFn() //根据滚动位置，高亮对应标题
    }, 85)
    window.addEventListener('scroll', handler)
    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [])

  function renderTOC(tocData, activeTitleID) {
    return <ul>
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
    <ArticleWrapper>
      <article className='markdown-body' ref={articleRef}>
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
          {renderTOC(tocData, activeTitleID)}
        </nav>
      </TOC>
    </ArticleWrapper>
  )
})

export default Article