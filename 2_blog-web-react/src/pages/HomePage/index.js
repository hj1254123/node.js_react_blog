import React, { memo, useState } from 'react'
import useSWR from 'swr'
import { CSSTransition } from 'react-transition-group'

import hjRequest from '../../services/request'
import { useSetHeaderTitle } from '../../hooks/useSetHeaderTitle'

import { HomeWrapper, Main } from './style'
import { Header } from '../../components'

const HomePage = memo(() => {
  useSetHeaderTitle("HouJi's Blog")
  const [pageIndex, setPageIndex] = useState(1)

  const { data } = useSWR(`/article/page/${pageIndex}`, (url) => {
    return hjRequest.get(url).then(d => d)
  })

  console.log(data)
  return (
    <HomeWrapper>
      <Header />
      {
        !data ? '' : <CSSTransition
          in={true}
          timeout={500}
          classNames='context'
          appear
        >
          <Main>
            home
          </Main>
        </CSSTransition>
      }
    </HomeWrapper>
  )
})

export default HomePage