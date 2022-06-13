import React, { memo } from 'react'

import { CommentWrapper } from './style'

const Comment = memo(({ articleID }) => {
  return (
    <CommentWrapper>
      <div className="panel">
        <div className="header">
          <input type="text" placeholder="昵称" />
          <input type="email" placeholder="邮箱" />
        </div>
        <div className="edit">
          <div className="content" contenteditable="true" data-text="要不要说点什么？" />
        </div>
        <div className="bottom">
          <button className="submit">提交</button>
        </div>
      </div>
      <div className="list">

      </div>
    </CommentWrapper>
  )
})

export default Comment