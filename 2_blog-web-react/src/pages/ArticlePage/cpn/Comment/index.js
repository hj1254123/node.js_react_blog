import React, { memo } from 'react'

import defaultImg from '../../../../assets/img/default-icon.png'

import { CommentWrapper } from './style'

const Comment = memo(({ articleID }) => {
  return (
    <CommentWrapper>
      <div className="panel">
        <div className="header">
          <input type="text" placeholder="昵称" />
          <input type="email" placeholder="邮箱（不公开）" />
        </div>
        <div className="edit">
          <div className="content" contenteditable="true" data-text="要不要说点什么？" />
        </div>
        <div className="bottom">
          <button className="submit">提交</button>
        </div>
      </div>
      <div className="list">
        <div className="number-of-comments">
          <span>10</span>
          评论
        </div>
        <div className="item">
          <div className="icon">
            <img src={defaultImg} alt="头像" />
          </div>
          <div className="info">
            <div className="username">default</div>
            <div className="time">2022/6/15</div>
            <div className="comment-content">评论内容</div>
          </div>
        </div>
      </div>
    </CommentWrapper>
  )
})

export default Comment