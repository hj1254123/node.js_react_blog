import React, { memo } from 'react'
import { CSSTransition } from 'react-transition-group'

import { useSetHeaderTitle } from '../../hooks/useSetHeaderTitle'

import { Header } from '../../components'
import { ArticleWrapper, Main } from './style'

const ArticlePage = memo(() => {
  useSetHeaderTitle('Article')

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