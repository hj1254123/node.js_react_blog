import React, { memo } from 'react'
import { Space } from 'antd'

import BasicStatistics from './BasicStatistics'
import ArticleCalendarHeatmap from './ArticleCalendarHeatmap'

const DashboardPage = memo(() => {

  return (
    <Space
      direction='vertical'
      style={{
        display: 'flex',
      }}
    >
      <BasicStatistics />
      <ArticleCalendarHeatmap />
    </Space>
  )
})

export default DashboardPage