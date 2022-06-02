import React, { memo } from 'react'
import ArticleCard from '../ArticleCard'
import { ArticleCardListWrapper } from './style'

const ArticleCardList = memo((props) => {
  const { title, articlesData = [] } = props

  return (
    <ArticleCardListWrapper>
      <h3>{title}</h3>
      <div className="article-list">
        <ul>
          {
            articlesData.map(item => { // 文章卡片列表
              return <li key={item.id} className='article-card'>
                <ArticleCard data={item} />
              </li>
            })
          }
        </ul>
      </div>
    </ArticleCardListWrapper>
  )
})

export default ArticleCardList