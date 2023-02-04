import React, { memo } from 'react'
import { Card, Space } from 'antd'

const DashboardPage = memo(() => {
  return (
    <Card title='Dashboard'>
      <Space
        direction='vertical'
        style={{
          display: 'flex',
        }}
      >

      </Space>
    </Card>
  )
})

export default DashboardPage