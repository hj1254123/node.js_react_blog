import React, { memo } from 'react'
import useSWR from 'swr'
import { CSSTransition } from 'react-transition-group'

import hjRequest from '../../services/request'

import { HomeWrapper, Main } from './style'
import { Header } from '../../components'

const HomePage = memo(() => {
  const { data } = useSWR('/test', (url) => {
    return hjRequest.get(url).then(d => d)
  })

  if(!data) {
    return <div>Loading</div>
  }

  return (
    <HomeWrapper>
      <Header />
      <CSSTransition
        in={true}
        timeout={500}
        classNames='context'
        appear
      >
        <Main>
          {data}
        </Main>
      </CSSTransition>
    </HomeWrapper>
  )
})

export default HomePage