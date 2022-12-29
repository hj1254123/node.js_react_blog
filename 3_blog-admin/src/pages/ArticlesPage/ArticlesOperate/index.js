import React, { memo, useState } from 'react'
import { Space, Button } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import ArticlesEditor from '../../../components/ArticleEditor'

const ArticlesOperate = memo(({ delArticles, selectedRowKeys }) => {
  const [isopen, setIsopen] = useState(false)
  
  return (
    <Space>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => { setIsopen(true) }}
      >添加文章</Button>
      <Button
        type="primary"
        icon={<DeleteOutlined />}
        danger
        onClick={() => (delArticles(selectedRowKeys))}
      >批量删除</Button>
      <ArticlesEditor
        title='新建文章'
        isopen={isopen}
        setIsopen={setIsopen}
      />
    </Space>
  )
})

export default ArticlesOperate