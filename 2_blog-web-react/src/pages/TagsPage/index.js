import React, { memo } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Header } from '../../components'
import { TagsWrapper, Main } from './style'

const TagsPage = memo(() => {
  return (
    <TagsWrapper>
      <Header />
      <CSSTransition
        in={true}
        timeout={500}
        classNames='context'
        appear
      >
        <Main>
          TagsPageTagsPageTagsPageTagsPageTagsPageTags Page TagsPageTagsPageTagsPageTagsPageTagsPageTagsPageTagsPageTagsPageTagsPageTagsPageTagsPageTagsPageTagsPageTagsPageTagsPage
        </Main>
      </CSSTransition>
    </TagsWrapper>
  )
})

export default TagsPage