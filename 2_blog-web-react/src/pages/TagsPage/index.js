import React, { memo, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useNavigate, useParams } from 'react-router-dom'

import { useSetHeaderTitle } from '../../hooks/useSetHeaderTitle'

import { Header } from '../../components'
import { TagsWrapper, Main, TagNameNavWrapper } from './style'
import useSWRImmutable from 'swr'
import hjRequest from '../../services/request'
import classNames from 'classnames'

const TagsPage = memo(() => {
  const [isUnfold, setIsUnfold] = useState(false)
  useSetHeaderTitle("Tags")
  const navigate = useNavigate()

  const { tagName = '全部' } = useParams()

  const { data } = useSWRImmutable(`/tags/page`, (url) => {
    return hjRequest.get(url).then(d => d)
  })
  const titleNameArr = data ? data[0] : []
  const tagMapArticleObj = data ? data[1] : {}

  const tagnameListClass = classNames('tagname-list', {
    'unfold': isUnfold
  })
  return (

    <TagsWrapper>
      <Header>
        <TagNameNavWrapper>
          <ul className={tagnameListClass}>
            <li
              className={tagName === '全部' ? 'active' : undefined}
              onClick={() => navigate('/tags')}
            >
              全部</li>
            {
              titleNameArr.map(item => {
                const isActive = tagName === item.tagName ? 'active' : undefined
                return <li
                  key={item.id}
                  className={isActive}
                  onClick={() => navigate('/tags/page/' + item.tagName)}
                >{item.tagName}</li>
              })
            }
            <button
              className='iconfont icon-icon3'
              onClick={() => setIsUnfold(!isUnfold)}
            ></button>
          </ul>
        </TagNameNavWrapper>
      </Header>

      {
        data && <SwitchTransition mode='out-in'>
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
      }
    </TagsWrapper>
  )
})

export default TagsPage