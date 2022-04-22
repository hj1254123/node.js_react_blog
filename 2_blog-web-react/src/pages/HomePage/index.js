import React, { memo, useState } from 'react'
import useSWR from 'swr'
import { CSSTransition } from 'react-transition-group'

import hjRequest from '../../services/request'
import { useSetHeaderTitle } from '../../hooks/useSetHeaderTitle'

import { HomePageWrapper, Main } from './style'
import { Header } from '../../components'
import ArticleList from './cpn/ArticleList'

const HomePage = memo(() => {
  useSetHeaderTitle("HouJi's Blog")
  const [pageIndex, setPageIndex] = useState(1)

  const { data } = useSWR(`/article/page/${pageIndex}`, (url) => {
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
            <button onClick={() => {
              setPageIndex(pageIndex + 1)
            }}>下一页</button>
          </Main>
        </CSSTransition>
      }
    </HomePageWrapper>
  )
})

export default HomePage