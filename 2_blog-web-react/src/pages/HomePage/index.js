import React, { memo } from 'react'
// import { Link } from 'react-router-dom'
import useSWR from 'swr'

import {
  HomeWrapper,
} from './style'

import hjRequest from '../../services/request'
const fetcher = (url) => {
  return hjRequest.get(url).then(d => d)
}

const HomePage = memo(() => {
  const { data, error } = useSWR('/test', fetcher)

  if(error) {
    return <div>请求出错</div>
  }
  if(!data) {
    return <div>loading...</div>
  }

  return (
    <div>
      <HomeWrapper>
        {data}
      </HomeWrapper>

    </div>
  )
})

export default HomePage