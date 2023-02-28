import React, { memo } from 'react'
import { Card, Col, Row, Skeleton, Statistic } from 'antd'
import { CommentOutlined, FileTextOutlined, RiseOutlined, TagsOutlined, } from '@ant-design/icons'
import useSWR from 'swr'

import hjRequest from '../../../services/request'

const BasicStatistics = memo(() => {
  const { data, error } = useSWR('/dashboard/basic_statistics', (url) => {
    return hjRequest.get(url).then(d => d)
  })
  const isLoading = !data && !error //SWR是否有数据正在请求(不包含重新验证)
  if(isLoading) return <Skeleton active />

  const colSpan = 6
  return (
    <Row gutter={16}>
      <Col span={colSpan}>
        <Card bordered={false}>
          <Statistic
            title="总文章数"
            value={data.data.totalArticles}
            prefix={<FileTextOutlined />}
          />
        </Card>
      </Col>
      <Col span={colSpan}>
        <Card bordered={false}>
          <Statistic
            title="总阅读量"
            value={data.data.totalViews}
            prefix={<RiseOutlined />}
          />
        </Card>
      </Col>
      <Col span={colSpan}>
        <Card bordered={false}>
          <Statistic
            title="总评论数"
            value={data.data.totalComments}
            prefix={<CommentOutlined />}
          />
        </Card>
      </Col>
      <Col span={colSpan}>
        <Card bordered={false}>
          <Statistic
            title="总标签数"
            value={data.data.totalViews}
            prefix={<TagsOutlined />}
          />
        </Card>
      </Col>
    </Row>
  )
})

export default BasicStatistics