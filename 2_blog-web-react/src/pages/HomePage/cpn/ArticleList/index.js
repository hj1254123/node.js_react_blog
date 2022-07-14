import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../../../utils/my-utils'

import { ArticleListWrapper } from './style'

const ArticleList = memo((props) => {
  
  const { data } = props

  function getTagsJSX(tags) {
    return tags.map(item => {
      return <li key={item.id}>
        <Link to={`/tags/page/${item.tagName}`} key={item.id}>{item.tagName}</Link>
      </li>
    })
  }
  return (
    <ArticleListWrapper>
      <ul>
        {
          data.map(item => {
            return (
              <li className='item' key={item.id}>
                <time className='date'>{formatDate(item.time)}</time>
                <h3>
                  <Link to={`/article/${item.id}`}>{item.title}</Link>
                </h3>
                <div className='introduction'>
                  <p>
                    {item.intro}
                  </p>
                  <Link to={`/article/${item.id}`}>阅读全文...</Link>
                </div>
                <div className="tags">
                  <ul>
                    {getTagsJSX(item.tags)}
                  </ul>
                </div>
              </li>
            )
          })
        }
      </ul>
    </ArticleListWrapper>

  )
})

export default ArticleList