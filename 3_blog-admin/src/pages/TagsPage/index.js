import React, { memo, useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useMount } from 'react-use'
import dayjs from 'dayjs'
import { Card, message, Modal, Space } from 'antd';

import hjRequest from '../../services/request'

import TagsList from './TagsList'
import TagsOperate from './TagsOperate';

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

  useEffect(() => { //切割下当前页数据
    const size = 10
    const start = (currentIndex - 1) * size
    const end = start + size
    setDataSource(data.slice(start, end))
  }, [currentIndex, data])

  const changePageIndex = useCallback((index) => {
    navigate(`/tags/page/${index}`)
    document.querySelector('.content').scrollTop = 0
  }, [navigate])

  const modifyTagName = useCallback(tags => {
    return hjRequest.put('/tags', tags)
      .then(d => {
        if(d.message === '修改标签名称成功') {
          message.success(d.message)
          const id = d.data.tag.id
          const tagName = d.data.tag.tagName
          const newData = data.map(item => {
            if(item.key === id) {
              return { ...item, tagName: tagName }
            }
            return item
          })
          setData(newData)
          return d
        } else {
          return Promise.reject({ data: d.message })
        }
      })
      .catch(err => {
        message.error(err?.data || '未知错误')
      })
  }, [data])



  const delTagsUseModal = useCallback(tagsIDArr => {
    if(tagsIDArr.length === 0) {
      message.info('未选择标签')
      return
    }
    
    Modal.confirm({
      content: '确定要删除吗？',
      maskClosable: true,
      onOk: () => {
        return hjRequest.delete('/tags/batch', { tagsIDArr })
          .then(d => {
            if(d.message === '批量删除标签成功') {
              message.success('删除标签成功')
              // 删除本地data对于的tag项
              let newData = data
              for(const tagID of tagsIDArr) {
                newData = newData.filter(item => (item.key !== tagID))
              }
              setData(newData)
              return d.data
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
        <TagsOperate selectedRowKeys={selectedRowKeys} delTagsUseModal={delTagsUseModal} />
        <TagsList
          dataSource={dataSource}
          setSelectedRowKeys={setSelectedRowKeys}
          changePageIndex={changePageIndex}
          total={data.length}
          modifyTagName={modifyTagName}
          delTagsUseModal={delTagsUseModal}
        />
      </Space>
    </Card>

  )
})

export default TagsPage