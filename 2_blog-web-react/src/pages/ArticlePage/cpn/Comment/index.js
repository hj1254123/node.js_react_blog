import React, { memo } from 'react'
import { useState } from 'react'
import useSWR from 'swr'
import toast from 'react-hot-toast';

import defaultImg from '../../../../assets/img/default-icon.png'
import hjRequest from '../../../../services/request'
import { formatDate } from '../../../../utils/my-utils'


import { CommentWrapper } from './style'
import { useEffect } from 'react';

const Comment = memo(({ articleID }) => {
  const [panel, setPanel] = useState({
    userName: '',
    email: '',
    content: ''
  })
  // 提交按钮允许点击与否
  const [isDisabledBtn, setIsDisabledBtn] = useState(true)
  useEffect(() => {
    if(panel.content === '') {
      setIsDisabledBtn(true)
    } else {
      setIsDisabledBtn(false)
    }
  }, [panel])

  const { data, mutate } = useSWR(`/comment/${articleID}`, (url) => {
    return hjRequest.get(url).then(d => d)
  })

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

  // 做两件事：
  //  1.获取并校验待发送评论数据 
  //  2.发送评论数据，并通过swr实现乐观更新
  async function submitComment() {
    // 0.禁止点击提交按钮,指定毫秒后恢复
    prohibitSumitBtn(10000)
    // 1.拿到并校验评论表单所需数据
    const formObj = checkComment()
    if(!formObj) return

    // 2.提交数据，并采用乐观更新
    // 该item用于乐观更新，在异步请求完成后会被替换
    const newItem = {
      id: data.data.length + 1,
      time: new Date().getTime(),
      content: formObj.content,
      userName: formObj.userName
    }
    // swr乐观更新配置项
    const options = {
      // 临时的新data，按照它更新评论列表，以实现乐观更新
      // 在请求数据返回会更新真正的评论item，详情见下方mutate函数
      optimisticData: { data: [newItem, ...data.data] },
      rollbackOnError: true, //请求出错回退
      revalidate: false, //异步请求结束后，不重新请求
    }
    // swr提供的mutate函数拷贝data再修改，根据拷贝render页面，提高用户体验；
    // 在异步请求完成后，通过返回值更新真正的data；
    // 这意味着可以在失败后方便的回退；
    await mutate(async () => {
      toast.success('评论已发送')
      const response = await hjRequest.post('/comment', {
        data: formObj
      })
      if(!response.message) {
        toast.error('未知错误')
      }

      if(response.message === '添加评论成功') {
        const resData = { data: [response.data, ...data.data] }
        // 这个数据会被用于更新真正的data
        return resData
      } else {
        toast.error(response.message)
        // 失败回退状态（data还没有被修改，乐观更新用的是另一个data拷贝）
        // （配置项设置了rollbackOnError: true，
        //  服务端返回错误状态码会自动回退，
        //  这里为了处理状态码正确的错误。）
        return data
      }
    }, options)

  }

  function checkComment() {
    const formObj = {}
    // 用户名
    if(panel.userName.length === 0) {
      formObj.userName = 'default'
    } else {
      formObj.userName = panel.userName
    }
    // 邮箱
    const regexp = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
    const checkEmail = regexp.test(panel.email)
    if(!checkEmail) {
      toast.error("邮箱格式不正确")
      return false
    }
    formObj.email = panel.email
    // 内容校验
    if(panel.content.length > 1000) {
      toast.error('评论字数大于1000，请删减！')
      return false
    }
    if(panel.content.length <= 0) {
      toast.error('评论内容不能为空')
      return false
    }
    formObj.content = panel.content
    // 文章id
    formObj.articleID = articleID
    return formObj
  }

  function prohibitSumitBtn(msec) {
    setIsDisabledBtn(true)
    setTimeout(() => {
      setIsDisabledBtn(false)
    }, msec)
  }

  return (
    <CommentWrapper>
      <form className="panel" onSubmit={e => {
        e.preventDefault()
        submitComment()
      }}>
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
            placeholder='要不要说点什么？'
            value={panel.content}
            onChange={(e => {
              setPanel({ ...panel, content: e.target.value })
            })}
          />
        </div>
        <div className="bottom">
          <button
            className="submit"
            disabled={isDisabledBtn}
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