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
  const [isUnfold, setIsUnfold] = useState(false) //控制展开tagNav

  const navigate = useNavigate()
  
  const { tagName = '全部' } = useParams()
  let headerTitle = 'Tags'
  if(tagName !== '全部') {
    headerTitle = 'Tags: ' + tagName
  }
  useSetHeaderTitle(headerTitle)

  const { data } = useSWRImmutable(`/tags/page`, (url) => {
    return hjRequest.get(url).then(d => d)
  })

  let titleNameArr = data ? data[0] : []
  const tagMapArticleObj = data ? data[1] : {}

  // 调整被高亮度titleName位置到数组头部
  function sortTitleNameArr() {
    if(tagName === '全部') return
    for(let i = 0; i < titleNameArr.length; i++) {
      const item = titleNameArr[i]
      if(item.tagName === tagName) {
        titleNameArr.splice(i, 1)
        titleNameArr.unshift(item)
        return
      }
    }
  }
  sortTitleNameArr()

  function renderTagNameNavJSX() {
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
              onClick={() => {
                navigate('/tags/page/' + item.tagName)
                setIsUnfold(false)
              }}
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

  function renderMainJSX() {
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
      <Header>{renderTagNameNavJSX()}</Header>
      {
        data && <SwitchTransition mode='out-in'>
          <CSSTransition
            timeout={500}
            classNames='context'
            key={tagName}
            appear
          >
            <Main>{renderMainJSX()}</Main>
          </CSSTransition>
        </SwitchTransition>
      }
    </TagsWrapper>
  )
})

export default TagsPage