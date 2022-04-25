import React, { memo } from 'react'
import useSWR from 'swr'
import { CSSTransition } from 'react-transition-group'

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


  return (
    <HomePageWrapper>
      <Header />
      {
        !data ? '' : <CSSTransition
          in={true}
          timeout={500}
          classNames='context'
          appear
        >
          <Main>
            <ArticleList data={data.data} />
            <PageNav currentIndex={currentIndex} total={data.total} />
          </Main>
        </CSSTransition>
      }
    </HomePageWrapper>
  )
})

export default HomePage