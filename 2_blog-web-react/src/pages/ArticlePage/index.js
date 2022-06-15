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
  // 小屏显示headerTitle，中大屏反之。
  const isShowHeaderTitle = useMedia(SmallScreenWidth)

  const { id } = useParams() // 从url取文章id

  useEffect(() => {
    document.documentElement.scrollTop = 0
  }, [id])

  const [tocData, setTocData] = useState([]) //存储 h2、h3 元素信息，用于 toc 渲染
  const { setTitle } = useTitleContext() //全局title

  const { data } = useSWRImmutable(`/article/${id}`, (url) => {
    return hjRequest.get(url).then(d => d)
  }, {
    onSuccess: (data) => {
      setTitle(data.data.title)
      setTocData(buildToc(data))
    }
  })
  
  // 解析返回用于渲染 TOC 的数据结构
  function buildToc(data) {
    const toc = [] // 最终处理好的标题数据
    const record = [] // 记录用过的html标题id，如果重复了做处理(我们期望id是唯一的)
    compiler(data.data.content, {
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
      createElement(type, props, children) {
        if(type === 'h2') {
          toc.push({ type, props, content: children, children: [] })
        } else if(type === 'h3') {
          // h3元素作为子节点，添加给最后一个h2元素
          toc[toc.length - 1].children.push({ type, props, content: children })
        }
      }
    })
    return toc
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