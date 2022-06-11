import React, { memo, useEffect, useRef, useState } from 'react'
import Markdown from 'markdown-to-jsx'; // markdown解析引擎
import hljs from 'highlight.js'; // 语法高亮支持
import 'highlight.js/styles/github.css';

import { formatDate, throttle } from '../../../../utils/my-utils';

import { ArticleWrapper, Tag } from './style'
import { Link } from 'react-router-dom';
import Nav from '../Nav'
import TOC from '../TOC'

// 本项目用 highlight 会自动给代码块添加对应语言的 class，
// 这里重写 code，取消markdown-to-jsx添加的无用class属性。
const MyCode = ({ children }) => (<code>{children}</code>)

const Article = memo((props) => {
  // console.log('Article render')
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

    // 设置需要被高亮的标题id（每次切换高亮时会调用 scrollToTOC 函数）
    const activeTitleFn = throttle(function() {
      if(list.length === 0) return // 为空跳过
      for(const e of list) {
        const { y } = e.getBoundingClientRect()
        // 高亮第一个 y 为正数的标题
        if(y >= 0) {
          setActiveTitleID(e.id) // 改变该属性，会使 toc 重新渲染，以更新高亮元素
          let activeLi = document.querySelector('.toc-list .active')
          activeLi && activeLi.scrollIntoView({block: 'center'}) // 滚动高亮的标题到可视区域
          return
        }
      }
      // 都为负数高亮最后一个
      setActiveTitleID(list[list.length - 1].id)
    }, 96)

    activeTitleFn() //初始化调用一次

    // 主函数
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

  // markdown 引擎没有对重复的 html 标签 id 做处理，
  // 我们自行处理，用 record 来记录已用过的 id，详情见下方 <Markdown /> 实现
  const record = []

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
              {
                articleData.tags.map(item => {
                  return <li key={item.id}>
                    <Link to={'/tags/page/' + item.tagName} key={item.id}>{item.tagName}</Link>
                  </li>
                })
              }
            </ul>
          </Tag>
        </article>
        <Nav data={articleData.nav} />
      </div>
      <TOC data={{ tocData, activeTitleID, fixedTOCClass }} />
    </ArticleWrapper>
  )
})

export default Article