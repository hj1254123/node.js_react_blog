import React, { memo } from 'react'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const CommentsOperate = memo(({ selectedRowComments, delComments }) => {
  return (
    <Button
      type="primary"
      icon={<DeleteOutlined />}
      danger
      onClick={() => (delComments(selectedRowComments))}
    >
      批量删除</Button>
  )
})

export default CommentsOperate