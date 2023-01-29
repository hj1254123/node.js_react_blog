import { Button, Table } from 'antd'
import React, { memo } from 'react'
import { BLOG_URL } from '../../../common/config'


const CommentsList = memo((props) => {
  const {
    dataSource, setSelectedRowComments,
    currentIndex, total,
    changePageIndex, delComments,
    isLoading,
  } = props

  const columns = [ //列配置
    {
      title: '评论ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '所属文章',
      dataIndex: 'articleTitle',
      key: 'articleTitle',
      ellipsis: true,
      render: (title, record) => (
        <a href={`${BLOG_URL}/article/${record.articleID}`} target="_blank" rel="noreferrer">{title}</a>
      )
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => { delCommentHandle([{
            commentID: record.id,
            articleID: record.articleID
          }]) }}
        >
          删除</Button>
      )
    }
  ]

  const rowSelection = {// 行选择配置
    onChange: (selectedRowKeys, selectedRows) => {
      const arr = []
      for (const item of selectedRows) {
        arr.push({
          commentID: item.id,
          articleID: item.articleID
        })
      }
      setSelectedRowComments(arr)
    }
  }

  const pagination = {  //页码配置
    defaultCurrent: 1,
    current: currentIndex,
    total: total,
    onChange: (page) => {
      changePageIndex(page)
    }
  }

  function delCommentHandle(commentID) {
    delComments(commentID)
  }

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowSelection={rowSelection}
      pagination={pagination}
      loading={isLoading}
    />
  )
})

export default CommentsList