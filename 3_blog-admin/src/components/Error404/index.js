import { memo } from 'react'
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const Error404 = memo(() => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在。"
      extra={<Button type="primary"><Link to='/home'>返回首页</Link></Button>}
      style={{ height: '100vh', width: '100vw', zIndex: '99999' }}
    />
  )
})

export default Error404

