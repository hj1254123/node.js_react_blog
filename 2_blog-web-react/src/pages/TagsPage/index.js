import React, { memo } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useParams } from 'react-router-dom'

import { useSetHeaderTitle } from '../../hooks/useSetHeaderTitle'

import { Header } from '../../components'
import { TagsWrapper, Main } from './style'

const TagsPage = memo(() => {
  useSetHeaderTitle("Tags")
  const {tagName} = useParams()
  console.log('tagName', tagName)
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