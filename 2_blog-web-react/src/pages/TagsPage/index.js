import React, { memo, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useNavigate, useParams } from 'react-router-dom'

import { useSetHeaderTitle } from '../../hooks/useSetHeaderTitle'

import { ArticleCardList, Header } from '../../components'
import { TagsWrapper, Main, TagNameNavWrapper } from './style'
import useSWRImmutable from 'swr'
import hjRequest from '../../services/request'
import classNames from 'classnames'

const TagsPage = memo(() => {
  useSetHeaderTitle("Tags")
  const [isUnfold, setIsUnfold] = useState(false) //控制展开tagNav

  const navigate = useNavigate()
  const { tagName = '全部' } = useParams()

  const { data } = useSWRImmutable(`/tags/page`, (url) => {
    return hjRequest.get(url).then(d => d)
  })

  const titleNameArr = data ? data[0] : []
  const tagMapArticleObj = data ? data[1] : {}

  function getTagNameNavJSX() {
    const tagnameListClass = classNames('tagname-list', {
      'unfold': isUnfold
    })

    return <TagNameNavWrapper>
      {/* tag标题导航栏 */}
      <ul className={tagnameListClass}>
        <li
          className={classNames({ 'active': tagName === '全部' })}
          onClick={() => navigate('/tags')}
        >
          全部</li>
        {
          titleNameArr.map(item => {
            return <li
              key={item.id}
              className={classNames({ 'active': tagName === item.tagName })}
              onClick={() => navigate('/tags/page/' + item.tagName)}
            >{item.tagName}</li>
          })
        }
        {/* 展开按钮 */}
        <button
          className='iconfont icon-icon3'
          onClick={() => setIsUnfold(!isUnfold)}
        ></button>
      </ul>
    </TagNameNavWrapper>
  }

  function getMainJSX() {
    if(tagName === '全部') {
      return titleNameArr.map(item => {
        let tagName = item.tagName
        let articlesData = tagMapArticleObj[tagName]
        return <ArticleCardList key={item.id} title={tagName} articlesData={articlesData} />
      })
    } else {
      return <ArticleCardList title={tagName} articlesData={tagMapArticleObj[tagName]} />

    }
  }

  return (
    <TagsWrapper>
      <Header>{getTagNameNavJSX()}</Header>
      {
        data && <SwitchTransition mode='out-in'>
          <CSSTransition
            timeout={500}
            classNames='context'
            key={tagName}
            appear
          >
            <Main>{getMainJSX()}</Main>
          </CSSTransition>
        </SwitchTransition>
      }
    </TagsWrapper>
  )
})

export default TagsPage