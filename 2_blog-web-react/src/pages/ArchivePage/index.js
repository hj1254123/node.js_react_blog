import React, { memo, useCallback } from 'react'

import { useSetHeaderTitle } from '../../hooks/useSetHeaderTitle'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'

import hjRequest from '../../services/request'

import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { ArticleCardList, Header, PageNav } from '../../components'
import { ArchiveWrapper, Main } from './style'

const ArchivePage = memo(() => {
  useSetHeaderTitle('Archive')
  // 从url获取page下标
  const { id } = useParams()
  const currentIndex = parseInt(id) || 1

  const { data } = useSWR(`/archive/${currentIndex}`, (url) => {
    return hjRequest.get(url).then(d => d)
  })
  const navigate = useNavigate()

  // 根据page下标跳转页面（传给pageNav调用的回调函数）
  const changeIndex = useCallback((index) => {
    navigate(`/archive/${index}`)
    document.documentElement.scrollTop = 0
  }, [navigate])

  // 标题格式处理为：二月,2022
  function mouthTitleHandle(title) {
    const monthChineseArr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"]
    const arr = title.split('-')
    const y = arr[0]
    const m = arr[1]
    return monthChineseArr[m] + '月,' + y
  }

  return (
    <ArchiveWrapper>
      <Header />
      {
        data && (
          <SwitchTransition mode='out-in'>
            <CSSTransition
              timeout={400}
              classNames='context'
              key={currentIndex}
              appear
            >
              <Main>
                {
                  data.data.map(item => { // 月份列表
                    const title = mouthTitleHandle(item.title) // 标题格式处理
                    return <ArticleCardList
                      key={item.title}
                      articlesData={item.articlesData}
                      title={title}
                    />
                  })
                }
                <PageNav
                  total={data.total}
                  currentIndex={currentIndex}
                  changeIndex={changeIndex}
                />
              </Main>
            </CSSTransition>
          </SwitchTransition>
        )
      }
    </ArchiveWrapper>
  )
})

export default ArchivePage