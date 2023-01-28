import React, { memo } from 'react'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const TagsOperate = memo(({selectedRowKeys, delTagsUseModal}) => {
  return (
    <Button
      type="primary"
      icon={<DeleteOutlined />}
      danger
      onClick={() => (delTagsUseModal(selectedRowKeys))}
    >
      批量删除</Button>
  )
})

export default TagsOperate