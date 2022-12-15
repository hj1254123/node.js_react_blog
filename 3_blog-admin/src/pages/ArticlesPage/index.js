import React, { memo, useCallback } from 'react'
import { Card, Table, Space, Button, Tag } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import useSWR from 'swr'
import hjRequest from '../../services/request';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useState } from 'react';

const ArticlesPage = memo(() => {
  // 当前页码
  const { id } = useParams()
  const currentIndex = parseInt(id) || 1
  // 获取currentIndex的文章列表数据
  const { data } = useSWR(`/article/page/${currentIndex}`, (url) => {
    return hjRequest.get(url).then(res => res)
  })
  // dataSource：用于展示的文章列表数据
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    if(!data) return
    const dataSource = []
    for(const article of data.data) {
      const tags = []
      for(const tag of article.tags) {
        tags.push(tag.tagName)
      }
      dataSource.push({
        key: article.id,
        title: article.title,
        views: article.views,
        tags: tags,
        time: dayjs(article.time).format('YYYY-MM-DD HH:mm:ss')
      })
    }
    setDataSource(dataSource)
  }, [data])
  // 表头配置
  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
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
  ]
  // 页码配置
  const pagination = { defaultCurrent: 1, total: 5 }
  // 行选择配置（复选框已选中的项）
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  }
  // const navigate = useNavigate()
  // 根据page下标跳转页面，传给pageNav调用的回调函数
  // const changeIndex = useCallback((index) => {
  //   navigate(`/article/page/${index}`)
  //   document.documentElement.scrollTop = 0
  // }, [navigate])

  return (
    <Card title='文章管理'>
      <Space
        direction='vertical'
        style={{
          display: 'flex',
        }}
      >
        <Space>
          <Button type="primary" icon={<PlusOutlined />}>添加文章</Button>
          <Button type="primary" icon={<DeleteOutlined />} danger>批量删除</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          rowSelection={rowSelection}
        />
      </Space>
    </Card>)
})

export default ArticlesPage