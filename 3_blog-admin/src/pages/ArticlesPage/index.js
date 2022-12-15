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
          {tags.map((tag) => {
            return (
              <Tag color='geekblue' key={tag}>{tag}</Tag>
            )
          })}
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
  const { id } = useParams()
  const currentIndex = parseInt(id) || 1

  const { data } = useSWR(`/article/page/${currentIndex}`, (url) => {
    return hjRequest.get(url).then(res => res)
  })

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
  console.log(data)
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
        <Table columns={columns} dataSource={dataSource} pagination={{ defaultCurrent: 1, total: 5 }} />
      </Space>

    </Card>)
})

export default ArticlesPage