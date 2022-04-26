import React, { memo, useCallback, useEffect } from 'react'
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
  const { id } = useParams()
  const currentIndex = parseInt(id) || 1

  const { data } = useSWR(`/article/page/${currentIndex}`, (url) => {
    return hjRequest.get(url).then(d => d)
  })

  const navigate = useNavigate()
  const changeIndex = useCallback((index) => {
    navigate(`/article/page/${index}`)
    document.documentElement.scrollTop = 0
  }, [])

  return (
    <HomePageWrapper>
      <Header />
      {
        !data ? '' : (
          <SwitchTransition mode='out-in'>
            <CSSTransition
              timeout={500}
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