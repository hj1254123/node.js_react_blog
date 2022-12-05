import { memo } from 'react'
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react'

const Error404 = memo(() => {

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在。"
      extra={
        <Button type="primary">
          <Link to='/dashboard' style={{color: '#fff'}}>返回首页</Link>
        </Button>
      }
    />
  )
})

export default Error404

