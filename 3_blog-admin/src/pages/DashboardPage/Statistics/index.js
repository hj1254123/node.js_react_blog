import React, { memo } from 'react'
import { Card, Col, Row, Statistic } from 'antd'
import { CommentOutlined, FileTextOutlined, RiseOutlined, TagsOutlined, } from '@ant-design/icons'

const Statistics = memo(({ data }) => {
  const colSpan = 6
  return (
    <Row gutter={16}>
      <Col span={colSpan}>
        <Card bordered={false}>
          <Statistic
            title="总文章数"
            value={data.totalArticles}
            prefix={<FileTextOutlined />}
          />
        </Card>
      </Col>
      <Col span={colSpan}>
        <Card bordered={false}>
          <Statistic
            title="总阅读量"
            value={data.totalViews}
            prefix={<RiseOutlined />}
          />
        </Card>
      </Col>
      <Col span={colSpan}>
        <Card bordered={false}>
          <Statistic
            title="总评论数"
            value={data.totalComments}
            prefix={<CommentOutlined />}
          />
        </Card>
      </Col>
      <Col span={colSpan}>
        <Card bordered={false}>
          <Statistic
            title="总标签数"
            value={data.totalViews}
            prefix={<TagsOutlined />}
          />
        </Card>
      </Col>
    </Row>
  )
})

export default Statistics