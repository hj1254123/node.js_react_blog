import React, { memo, useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useMount } from 'react-use'
import dayjs from 'dayjs'
import { Button, Card, message, Modal, Space } from 'antd';
import useSWR from 'swr';

import hjRequest from '../../services/request'

import CommentsOperate from './CommentsOperate';
import CommentsList from './CommentsList';

const CommentsPage = memo(() => {
  const [dataSource, setDataSource] = useState([]) //列表需要的数据
  const [selectedRowComments, setSelectedRowComments] = useState({}) //选中的行，评论对象

  const navigate = useNavigate()
  const { id } = useParams() // 当前页码
  const currentIndex = parseInt(id) || 1

  const { data, mutate, error } = useSWR(`/comment/page/${currentIndex}`, (url) => {
    return hjRequest.get(url).then(res => res)
  })

  const isLoading = !data && !error //SWR是否有数据正在请求(不包含重新验证)

  useEffect(() => {
    if(!data) return
    const dataSource = []
    const commentsData = data?.data
    for(const item of commentsData) {
      dataSource.push({
        ...item,
        key: item.id,
        time: dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')
      })
    }
    setDataSource(dataSource)
  }, [data])


  const changePageIndex = useCallback((index) => {
    navigate(`/comment/page/${index}`)
    document.querySelector('.content').scrollTop = 0
  }, [navigate])

  const delComments = useCallback((commentsIDArr) => {
    if(commentsIDArr.length === 0) {
      message.info('未选择评论')
      return
    }
    Modal.confirm({
      content: '确定要删除吗？',
      maskClosable: true,
      onOk: () => {
        return hjRequest.delete('/comment/batch', { data: commentsIDArr })
          .then(d => {
            if(d.message === '评论批量删除成功') {
              message.success('删除评论成功')
              const resData = d.data
              let newData = data.data
              for(const item of resData) {
                const commentID = item.commentID
                newData = newData.filter(item2 => {
                  return item2.id !== commentID
                })
              }
              mutate(
                { ...data, data: newData },
                //禁止重新验证
                { revalidate: false },
              )
              return resData
            } else {
              return Promise.reject({ data: d.message })
            }
          })
          .catch(err => {
            message.error(err?.data || '未知错误')
          })
      },
    })
  }, [data])

  return (
    <Card title='标签管理'>
      <Space
        direction='vertical'
        style={{
          display: 'flex',
        }}
      >
        <CommentsOperate
          selectedRowComments={selectedRowComments}
          delComments={delComments}
        />
        <CommentsList
          dataSource={dataSource}
          setSelectedRowComments={setSelectedRowComments}
          currentIndex={currentIndex}
          total={data?.total}
          changePageIndex={changePageIndex}
          delComments={delComments}
          isLoading={isLoading}
        />
      </Space>
    </Card>

  )
})

export default CommentsPage