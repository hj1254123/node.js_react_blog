import React, { memo } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useParams } from 'react-router-dom'

import { useSetHeaderTitle } from '../../hooks/useSetHeaderTitle'

import { Header } from '../../components'
import { TagsWrapper, Main } from './style'
import useSWR from 'swr'
import hjRequest from '../../services/request'

const TagsPage = memo(() => {
  useSetHeaderTitle("Tags")
  const { tagName = '全部' } = useParams()
  const { data } = useSWR(`/tags/page`, (url) => {
    return hjRequest.get(url).then(d => d)
  })
  console.log(data)
  return (
    <TagsWrapper>
      <Header />
      <SwitchTransition mode='out-in'>
        <CSSTransition
          timeout={500}
          classNames='context'
          key={tagName}
          appear
        >
          <Main>
            
          </Main>
        </CSSTransition>
      </SwitchTransition>
    </TagsWrapper>
  )
})

export default TagsPage