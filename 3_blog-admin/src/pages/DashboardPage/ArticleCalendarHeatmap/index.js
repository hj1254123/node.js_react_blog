import React, { memo, } from 'react'
import { Card, Skeleton } from 'antd';
import useSWR from 'swr'
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs'

import hjRequest from '../../../services/request'

const ArticleCalendarHeatmap = memo(() => {
  const { data, error } = useSWR(`/dashboard/annual_article_statistics/recent`, (url) => {
    return hjRequest.get(url).then(d => d)
  })
  
  const isLoading = !data && !error //SWR是否有数据正在请求(不包含重新验证)
  console.log(isLoading)
  if(isLoading) return <Skeleton active />

  const option = getCalendarHeatmapOption(data.data, data.max, data.range)
  return (
    <Card>
      <ReactECharts option={option} />
    </Card>
  )
})

function getInRangeData(data, range) {
  const date = dayjs(range[0])
  const end = dayjs(range[1])
  const dayTime = 3600 * 24 * 1000;
  const dataSource = [];
  for(let time = date; time < end; time += dayTime) {
    const day = dayjs(time).format('YYYY-MM-DD')
    let count = 0
    if(data.hasOwnProperty(day)) {
      count = data[day]
    }
    dataSource.push([
      day,
      count,
    ])
  }
  return dataSource
}

function getCalendarHeatmapOption(data, max, range) {
  const dataSource = getInRangeData(data, range)

  return {
    title: {
      top: 30,
      left: 'center',
      text: '一年内活跃度',
    },
    tooltip: {},
    visualMap: {
      text: ['More', 'Less'],
      showLabel: false,
      pieces: [
        { min: 2 / 3 * max, max: max },
        { min: 1 / 3 * max, max: 2 / 3 * max },
        { min: 0, max: 1 / 3 * max },
        { min: 0, max: 0 }
      ],
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 65,
      inRange: {
        color: ['#ebedf0', '#1677ff']
      },
    },
    calendar: {
      top: 120,
      left: 30,
      right: 30,
      cellSize: 'auto',
      range: range,
      itemStyle: {
        borderWidth: 0.5
      },
      yearLabel: { show: false },
      splitLine: false,
      itemStyle: {
        borderWidth: 5,
        borderColor: '#fff',
      }
    },
    series: {
      type: 'heatmap',
      name: '文章数',
      coordinateSystem: 'calendar',
      data: dataSource,
      tooltip: {
        formatter: (params) => {
          const [day, count] = params.value
          return `${day} <br /> 文章数：${count}`
        }
      }
    }
  }
}

export default ArticleCalendarHeatmap