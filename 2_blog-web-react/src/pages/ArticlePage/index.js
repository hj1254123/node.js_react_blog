import React, { memo } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useParams } from 'react-router-dom'

import { useSetHeaderTitle } from '../../hooks/useSetHeaderTitle'

import { Header } from '../../components'
import { ArticleWrapper, Main } from './style'

const ArticlePage = memo(() => {
  useSetHeaderTitle('Article')
  const { id } = useParams()
  console.log('id', id)
  return (
    <ArticleWrapper>
      <Header />
      <CSSTransition
        in={true}
        timeout={500}
        classNames='context'
        appear
      >
        <Main>
          ArticlePage
        </Main>
      </CSSTransition>
    </ArticleWrapper>


  )
})

export default ArticlePage