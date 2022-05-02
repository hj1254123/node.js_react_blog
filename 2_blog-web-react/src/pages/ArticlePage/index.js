import React, { memo, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useParams } from 'react-router-dom'
import useSWRImmutable from 'swr'

import hjRequest from '../../services/request'
import { useTitleContext } from '../../context/Title-context'

import { Header } from '../../components'
import { ArticleWrapper, Main } from './style'

const ArticlePage = memo(() => {
  useEffect(() => {
    document.documentElement.scrollTop = 0
  }, [])

  const { setTitle } = useTitleContext()

  const { id } = useParams()
  const { data } = useSWRImmutable(`/article/${id}`, (url) => {
    return hjRequest.get(url).then(d => d)
  }, {
    onSuccess: (data) => {
      setTitle(data.data.title)
    }
  })

  return (
    <ArticleWrapper>
      {
        data && <>
          <Header />
          <CSSTransition
            in={true}
            timeout={500}
            classNames='context'
            appear
          >
            <Main>
              
            </Main>
          </CSSTransition>
        </>
      }
    </ArticleWrapper>


  )
})

export default ArticlePage