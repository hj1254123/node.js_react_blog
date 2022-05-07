import React, { memo, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useParams } from 'react-router-dom'
import useSWRImmutable from 'swr'
import Markdown from 'markdown-to-jsx';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import hjRequest from '../../services/request'
import { useTitleContext } from '../../context/Title-context'

import { Header } from '../../components'
import { ArticleWrapper, Main } from './style'

// 本项目用 highlight 会自动给代码块添加对应语言的 class，
// 这里重写 code，取消markdown-to-jsx添加的无用class属性。
const MyCode = ({ children }) => (<code>{children}</code>)

const ArticlePage = memo(() => {
  useEffect(() => {
    document.documentElement.scrollTop = 0
  }, [])
  useEffect(() => {
    hljs.highlightAll()
  })

  const { setTitle } = useTitleContext()
  const { id } = useParams()
  const { data } = useSWRImmutable(`/article/${id}`, (url) => {
    return hjRequest.get(url).then(d => d)
  }, {
    onSuccess: (data) => {
      setTitle(data.data.title)
    }
  })
  console.log(data)

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
              <Markdown
                children={data.data.content}
                options={{
                  wrapper: 'article', //改变包装元素
                  slugify: str => str, //标题元素id='中文'正常处理
                  disableParsingRawHTML: true, //转义尖括号<>
                  overrides: { // 通过重写code，去掉markdown-to-jsx添加的语言class，交给highlight.js自动添加
                    code: MyCode
                  },
                }}
              />
            </Main>
          </CSSTransition>
        </>
      }
    </ArticleWrapper>


  )
})

export default ArticlePage