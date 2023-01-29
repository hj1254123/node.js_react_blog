import React, { memo } from 'react'
import { Table, Space, Button, Tag } from 'antd'
import { BLOG_URL } from '../../../common/config'

const ArticlesList = memo((props) => {
  const {
    setSelectedRowKeys,
    dataSource, delArticles,
    currentIndex, changePageIndex,
    totalArticles, editorArticle,
  } = props

  const columns = [ //列配置
    {
      title: '文章ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (title, record) => (
        <a href={`${BLOG_URL}/article/${record.key}`} target="_blank" rel="noreferrer">{title}</a>
      )
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <span>
          {tags.map((tag) => <Tag color='geekblue' key={tag}>{tag}</Tag>)}
        </span>
      ),
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      key: 'views',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => { editorArticle(record.key) }}>编辑</Button>
          <Button type="primary" onClick={() => { delArticles([record.key]) }} danger>删除</Button>
        </Space>
      )
    }
  ]

  const rowSelection = {// 行选择配置
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  const pagination = {  //页码配置
    defaultCurrent: 1,
    current: currentIndex,
    total: totalArticles,
    onChange: (page) => {
      changePageIndex(page)
    }
  }

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowSelection={rowSelection}
      pagination={pagination}
      loading={!dataSource}
    />
  )
})

export default ArticlesList