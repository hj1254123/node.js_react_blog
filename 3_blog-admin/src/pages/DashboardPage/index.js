import React, { memo } from 'react'
import { Skeleton, Space } from 'antd'
import useSWR from 'swr'
import Statistics from './Statistics'

import hjRequest from '../../services/request'

const DashboardPage = memo(() => {
  const { data, error } = useSWR('/dashboard/statistics', (url) => {
    return hjRequest.get(url).then(d => d)
  })
  console.log(data)
  const isLoading = !data && !error //SWR是否有数据正在请求(不包含重新验证)
  if(isLoading) return <Skeleton active />
  return (
    <Space
      direction='vertical'
      style={{
        display: 'flex',
      }}
    >
      <Statistics data={data.basicInformation} />
    </Space>
  )
})

export default DashboardPage