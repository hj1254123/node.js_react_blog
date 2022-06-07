import React, { memo, useEffect, useRef, useState } from 'react'
import Markdown from 'markdown-to-jsx'; // markdown解析引擎
import hljs from 'highlight.js'; // 语法高亮支持
import 'highlight.js/styles/github.css';

import { formatDate, throttle } from '../../../../utils/my-utils';

import { ArticleWrapper, TOC, Tag } from './style'
import { Link } from 'react-router-dom';
import Nav from '../Nav'

// 本项目用 highlight 会自动给代码块添加对应语言的 class，
// 这里重写 code，取消markdown-to-jsx添加的无用class属性。
const MyCode = ({ children }) => (<code>{children}</code>)

const Article = memo((props) => {
  console.log('Article render')
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
    const activeTitleFn = throttle(function() {
      if(list.length === 0) return // 为空跳过
      for(const e of list) {
        const { y } = e.getBoundingClientRect()
        // 高亮第一个 y 为正数的标题
        if(y >= 0) {
          setActiveTitleID(e.id)
          return
        }
      }
      // 都为负数高亮最后一个
      setActiveTitleID(list[list.length - 1].id)
    }, 96)

    activeTitleFn() //初始化调用一次

    // *主函数
    const handler = throttle(function() {
      const y = document.documentElement.scrollTop || document.body.scrollTop
      setFixedTOC(y >= 275) //决定是否fixedTOC
      activeTitleFn() //根据滚动位置，高亮对应标题
    }, 16)
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

  function renderTag(tags) {
    return tags.map(item => {
      return <li key={item.id}>
        <Link to={'/tags/page/' + item.tagName} key={item.id}>{item.tagName}</Link>
      </li>
    })
  }

  const record = [] // 记录用过的html标题id，如果重复了做处理(我们期望id是唯一的)

  return (
    <ArticleWrapper>
      <div className='content'>
        <article className='markdown-body' ref={articleRef}>
          <h1>{articleData.title}</h1>
          <time>{formatDate(articleData.time)}</time>
          <Markdown
            children={articleData.content}
            options={{
              forceWrapper: true, //即使只有一个子元素也包装（本例用div包装）
              slugify: str => { //标题元素id='中文'正常处理
                // 如果id重复了
                if(record.includes(str)) {
                  // 检查已经有几个重复的id
                  let count = 0
                  for(const item of record) {
                    if(item === str) {
                      count = count + 1
                    }
                  }
                  record.push(str)
                  str += count
                }
                record.push(str)
                return str
              },
              disableParsingRawHTML: true, //转义尖括号<>
              overrides: { // 通过重写code，去掉markdown-to-jsx添加的语言class，交给highlight.js自动添加
                code: MyCode
              }
            }}
          />
          <Tag>
            <ul>
              {renderTag(articleData.tags)}
            </ul>
          </Tag>
        </article>
        <Nav data={articleData.nav} />
      </div>
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