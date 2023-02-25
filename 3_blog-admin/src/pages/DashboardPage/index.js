import React, { memo } from 'react'
import { Space } from 'antd'
import Statistics from './Statistics'

const DashboardPage = memo(() => {

  return (
    <Space
      direction='vertical'
      style={{
        display: 'flex',
      }}
    >
      <Statistics />
    </Space>
  )
})

export default DashboardPage