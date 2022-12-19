import React, { memo, useCallback } from 'react'
import { Card, Table, Space, Button, Tag, Modal, message } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import useSWR from 'swr'
import hjRequest from '../../services/request';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useState } from 'react';

const ArticlesPage = memo(() => {
  const [dataSource, setDataSource] = useState([]) // dataSource：用于展示的文章列表数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的行，key数组
  const [selectedRows, setSelectedRows] = useState([]) //选中的行，详细数据数组

  const { id } = useParams() // 当前页码
  const currentIndex = parseInt(id) || 1
  const navigate = useNavigate()
  const changePageIndex = useCallback((index) => {
    navigate(`/articles/page/${index}`)
    document.querySelector('.content').scrollTop = 0
  }, [navigate])

  const { data, mutate } = useSWR(`/article/page/${currentIndex}`, (url) => {
    return hjRequest.get(url).then(res => res)
  })
  console.log(data)

  useEffect(() => { // 格式化data
    if(!data) return
    const dataSource = []
    // 处理数据为 Table 需要的格式
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


  const columns = [ //列配置
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
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
          <Button type="primary" onClick={() => { console.log(record) }}>编辑</Button>
          <Button type="primary" onClick={() => { delArticles([record.key]) }} danger>删除</Button>
        </Space>
      )
    }
  ]

  const rowSelection = {// 行选择配置
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedRows)
    }
  }

  const pagination = {  //页码配置
    defaultCurrent: 1,
    current: currentIndex,
    total: data?.totalArticles,
    onChange: (page) => {
      changePageIndex(page)
    }
  }
  
  function delArticles(articleIDArr) { // 删除文章
    Modal.confirm({
      content: '确定要删除文章吗？',
      maskClosable: true,
      onOk: async () => {
        const res = await hjRequest.delete('/article/batch', {
          articlesID: articleIDArr
        })

        if(res.message === '批量删除文章成功') {
          let newData = data.data
          for(const articleID of articleIDArr) {
            newData = newData.filter(item => {
              return item.id !== articleID
            })
          }

          mutate({
            ...data,
            data: newData
          })
          message.success('删除文章成功')
        } else {
          message.error(res.message || '未知错误')
        }
      }
    })


  }

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
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            danger
            onClick={() => (delArticles(selectedRowKeys))}
          >批量删除</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          rowSelection={rowSelection}
          loading={!data}
        />
      </Space>
    </Card>)
})

export default ArticlesPage