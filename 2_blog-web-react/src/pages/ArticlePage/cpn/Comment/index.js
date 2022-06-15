import React, { memo } from 'react'
import { useState } from 'react'
import useSWR from 'swr'

import defaultImg from '../../../../assets/img/default-icon.png'
import hjRequest from '../../../../services/request'
import { formatDate } from '../../../../utils/my-utils'


import { CommentWrapper } from './style'

const Comment = memo(({ articleID }) => {
  const [panel, setPanel] = useState({
    userName: '',
    email: '',
    content: ''
  })

  const { data, mutate } = useSWR(`/comment/${articleID}`, (url) => {
    return hjRequest.get(url).then(d => d)
  })
  console.log(data)

  function renderCommentList(data) {
    return data.map(item => {
      return <div className="item" key={item.id}>
        <div className="icon">
          <img src={defaultImg} alt="头像" />
        </div>
        <div className="info">
          <div className="username">{item.userName}</div>
          <div className="time">{formatDate(item.time)}</div>
          <div className="comment-content">{item.content}</div>
        </div>
      </div>
    })
  }

  function submitComment(e) {
    e.preventDefault()
    const formObj = {}
    console.log(panel.userName)
    // 用户名
    if(panel.userName.length === 0) {
      formObj.userName = 'default'
    } else {
      formObj.userName = panel.userName
    }
    // 邮箱
    const regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    const checkEmail = regexp.test(panel.email)
    if(!checkEmail) {
      alert('邮箱格式不正确')
      return
    }
    formObj.email = panel.email
    // 内容校验
    if(panel.content.length > 1000) {
      alert('评论字数大于1000，请删减！')
    }
    formObj.content = panel.content
    // 文章id
    formObj.articleID = articleID

    // 提交数据
    console.log(formObj)
    console.log(data)
    // data.data.push(formObj)
    // const options = { optimisticData: data, rollbackOnError: true }
    // mutate(async (formObj) => {
    //   const newData = await hjRequest.post('/comment', {
    //     data: formObj
    //   })
    //   return newData
    // }, options);
  }

  return (
    <CommentWrapper>
      <form className="panel" onSubmit={submitComment}>
        <div className="header">
          <input
            type="text"
            placeholder="昵称"
            value={panel.userName}
            onChange={(e => {
              setPanel({ ...panel, userName: e.target.value })
            })}
          />
          <input
            type="email"
            placeholder="邮箱（不公开）"
            value={panel.email}
            onChange={(e => {
              setPanel({ ...panel, email: e.target.value })
            })}
          />
        </div>
        <div className="edit">
          <textarea
            className="content"
            value={panel.content}
            onChange={(e => {
              setPanel({ ...panel, content: e.target.value })
            })}
          />
        </div>
        <div className="bottom">
          <button
            className="submit"
            disabled={panel.content ? '' : 'disabled'}
          >提交</button>
        </div>
      </form>

      <div className="list">
        <div className="number-of-comments">
          <span>{data ? data.data.length : 0}</span>
          评论
        </div>
        {
          data ? renderCommentList(data.data) : '加载中...'
        }
      </div>
    </CommentWrapper>
  )
})

export default Comment