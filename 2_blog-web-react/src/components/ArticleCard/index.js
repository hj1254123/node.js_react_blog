import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/my-utils'
import { ArticleListWrapper } from './style'

const ArticleCard = memo((props) => {
  const { data } = props
  function getTagsJSX(tags) {
    return tags.map(item => {
      return <li key={item.id}>
        <Link to='/tags/page/JavaScript' key={item.id}>{item.tagName}</Link>
      </li>
    })
  }
  return (
    <ArticleListWrapper>
      <div className='item'>
        <time className='date'>{formatDate(data.time)}</time>
        <h3>
          <Link to={`/article/${data.id}`}>{data.title}</Link>
        </h3>

        <div className="tags">
          <ul>
            {getTagsJSX(data.tags)}
          </ul>
        </div>
      </div>
    </ArticleListWrapper>

  )
})

export default ArticleCard