import React, { memo, useCallback } from 'react'
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import hjRequest from '../../services/request'
import { useSetHeaderTitle } from '../../hooks/useSetHeaderTitle'

import { HomePageWrapper, Main } from './style'
import { Header, PageNav } from '../../components'
import ArticleList from './cpn/ArticleList'
import { useParams } from 'react-router-dom'

const HomePage = memo(() => {
  useSetHeaderTitle("HouJi's Blog")
  // 从url获取page下标
  const { id } = useParams()
  const currentIndex = parseInt(id) || 1

  const { data } = useSWR(`/article/page/${currentIndex}`, (url) => {
    return hjRequest.get(url).then(d => d)
  })

  const navigate = useNavigate()
  // 根据page下标跳转页面，传给pageNav调用的回调函数
  const changeIndex = useCallback((index) => {
    navigate(`/article/page/${index}`)
    document.documentElement.scrollTop = 0
  }, [navigate])

  return (
    <HomePageWrapper>
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
                <ArticleList data={data.data} />
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
    </HomePageWrapper >
  )
})

export default HomePage