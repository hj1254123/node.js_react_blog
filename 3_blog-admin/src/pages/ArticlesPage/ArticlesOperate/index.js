import React, { memo } from 'react'
import { Space, Button } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

const ArticlesOperate = memo(({ delArticles, selectedRowKeys, addArticle }) => {
  
  return (
    <Space>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => { addArticle() }}
      >添加文章</Button>
      <Button
        type="primary"
        icon={<DeleteOutlined />}
        danger
        onClick={() => (delArticles(selectedRowKeys))}
      >批量删除</Button>
    </Space>
  )
})

export default ArticlesOperate