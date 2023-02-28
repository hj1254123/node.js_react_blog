import React, { memo, useState } from 'react'
import useSWR from 'swr'
import hjRequest from '../../../services/request'

const ArticleCalendarHeatmap = memo(() => {
  const [year, setYear] = useState(2023)
  const { data, error } = useSWR(`/dashboard/annual_article_statistics/${year}`, (url) => {
    return hjRequest.get(url).then(d => d)
  })
  const isLoading = !data && !error //SWR是否有数据正在请求(不包含重新验证)
  console.log(data)
  return (
    <div>ArticleCalendarHeatmap</div>
  )
})

export default ArticleCalendarHeatmap