import React, { memo, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useParams } from 'react-router-dom'
import useSWRImmutable from 'swr'
import { compiler } from 'markdown-to-jsx'; // markdown解析引擎

import hjRequest from '../../services/request'
import { useTitleContext } from '../../context/Title-context'
import { useMedia } from 'react-use';

import { SmallScreenWidth } from '../../common/constant';

import { Header } from '../../components'
import { ArticleWrapper } from './style'
import Article from './cpn/Article'


const ArticlePage = memo(() => {
  useEffect(() => {
    document.documentElement.scrollTop = 0
  }, [])
  // 小屏显示headerTitle，中大屏反之。
  const isShowHeaderTitle = useMedia(SmallScreenWidth)
  // 存储 h2、h3 元素信息，用于 toc 渲染
  const [tocData, setTocData] = useState([])

  const { setTitle } = useTitleContext()
  const { id } = useParams()
  const { data } = useSWRImmutable(`/article/${id}`, (url) => {
    return hjRequest.get(url).then(d => d)
  }, {
    onSuccess: (data) => {
      setTitle(data.data.title)
      setTocData(buildToc(data))
    }
  })

  function buildToc(data) {
    const headings = []
    compiler(data.data.content, {
      slugify: str => str, //标题元素id='中文'正常处理
      createElement(type, props, children) {
        if(type === 'h2') {
          headings.push({ type, props, content: children, children: [] })
        } else if(type === 'h3') {
          headings[headings.length - 1].children.push({ type, props, content: children })
        }
      }
    })
    return headings
  }
  return (
    <ArticleWrapper>
      {
        data && <>
          <Header isShowTitle={isShowHeaderTitle} />
          <CSSTransition
            in={true}
            timeout={500}
            classNames='context'
            appear
          >
            <Article articleData={data.data} tocData={tocData} />

          </CSSTransition>
        </>
      }
    </ArticleWrapper>
  )
})

export default ArticlePage