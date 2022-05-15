import React, { memo, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useParams } from 'react-router-dom'
import useSWRImmutable from 'swr'
import Markdown from 'markdown-to-jsx'; // markdown解析引擎
import hljs from 'highlight.js'; // 语法高亮支持
import 'highlight.js/styles/github.css';

import hjRequest from '../../services/request'
import { useTitleContext } from '../../context/Title-context'
import { formatDate } from '../../utils/my-utils';

import { Header } from '../../components'
import { ArticleWrapper, Main, TOC } from './style'

// 本项目用 highlight 会自动给代码块添加对应语言的 class，
// 这里重写 code，取消markdown-to-jsx添加的无用class属性。
const MyCode = ({ children }) => (<code>{children}</code>)

const ArticlePage = memo(() => {
  useEffect(() => {
    document.documentElement.scrollTop = 0
  }, [])

  const { setTitle } = useTitleContext()
  const { id } = useParams()
  const { data } = useSWRImmutable(`/article/${id}`, (url) => {
    return hjRequest.get(url).then(d => d)
  }, {
    onSuccess: (data) => {
      setTitle(data.data.title)
    }
  })
  useEffect(() => {
    hljs.highlightAll()
  }, [data])

  return (
    <ArticleWrapper>
      {
        data && <>
          <Header isShowTitle={false} />
          <CSSTransition
            in={true}
            timeout={500}
            classNames='context'
            appear
          >
            <Main>
              <article className='markdown-body'>
                <h1>{data.data.title}</h1>
                <time>{formatDate(data.data.time)}</time>
                <Markdown
                  children={data.data.content}
                  options={{
                    forceWrapper: true, //即使只有一个子元素，也包装（本例用div包装）
                    slugify: str => str, //标题元素id='中文'正常处理
                    disableParsingRawHTML: true, //转义尖括号<>
                    overrides: { // 通过重写code，去掉markdown-to-jsx添加的语言class，交给highlight.js自动添加
                      code: MyCode
                    },
                  }}
                />
              </article>
              <TOC>
                <ul>
                  <li>1</li>
                  <li>2
                    <ul>
                      <li>1</li>
                      <li>2</li>
                      <li>3</li>
                      <li>4</li>
                    </ul>
                  </li>
                  <li>3</li>
                </ul>
              </TOC>

            </Main>
          </CSSTransition>
        </>
      }
    </ArticleWrapper>


  )
})

export default ArticlePage