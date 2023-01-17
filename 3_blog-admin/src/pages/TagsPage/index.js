import React, { memo, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useMount } from 'react-use'
import { Button, Space, Table } from 'antd'
import dayjs from 'dayjs'

import hjRequest from '../../services/request'

const TagsPage = memo(() => {
  const navigate = useNavigate()
  const { id } = useParams() // 当前页码
  const currentIndex = parseInt(id) || 1

  const [data, setData] = useState([]) // 处理后的 Table 需要的格式的所有数据
  const [dataSource, setDataSource] = useState([]) // 切割后的 Table 当前页数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的行，key数组

  useMount(() => {
    hjRequest.get('/tags/page').then(d => {
      const tags = d[0]
      const tagMapArticles = d[1]
      const arr = []
      for(const tag of tags) {
        const item = {
          key: tag.id,
          tagName: tag.tagName,
          numberOfArticles: tagMapArticles[tag.tagName]?.length || 0,
          time: dayjs(tag.time).format('YYYY-MM-DD HH:mm:ss'),
        }
        arr.push(item)
      }
      setData(arr)
    })
  })

  useEffect(() => {
    // 切割下当前页数据
    const size = 10
    const start = (currentIndex - 1) * size
    const end = start + size
    setDataSource(data.slice(start, end))
  }, [currentIndex, data])

  console.log('selectedRowKeys', selectedRowKeys)
  const columns = [
    {
      title: '标签ID',
      dataIndex: 'key',
    },
    {
      title: '标签名',
      dataIndex: 'tagName',
    },
    {
      title: '文章量',
      dataIndex: 'numberOfArticles',
    },
    {
      title: '添加时间',
      dataIndex: 'time',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => { }}>编辑</Button>
          <Button type="primary" onClick={() => { }} danger>删除</Button>
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
    total: data.length,
    onChange: (page) => {
      changePageIndex(page)
    }
  }

  function changePageIndex(index) {
    navigate(`/tags/page/${index}`)
    document.querySelector('.content').scrollTop = 0
  }

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      rowSelection={rowSelection}
      loading={!dataSource}
    />
  )
})

export default TagsPage