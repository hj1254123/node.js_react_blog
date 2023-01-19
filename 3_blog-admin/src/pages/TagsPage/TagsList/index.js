import React, { memo, useState } from 'react'
import { Button, Form, Input, Modal, Space, Table } from 'antd'


const TagsList = memo((props) => {
  const {
    dataSource, setSelectedRowKeys,
    changePageIndex, currentIndex,
    total
  } = props
  
  const [isModalOpen, setIsModalOpen] = useState(false)

  const columns = [
    {
      title: '标签ID',
      dataIndex: 'key',
    },
    {
      title: '标签名',
      dataIndex: 'tagName',
    },
    {
      title: '文章量',
      dataIndex: 'numberOfArticles',
    },
    {
      title: '添加时间',
      dataIndex: 'time',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => { setIsModalOpen(true) }}>编辑</Button>
          <Button type="primary" onClick={() => { console.log(text, record) }} danger>删除</Button>
        </Space>
      )
    }
  ]

  const rowSelection = {// 行选择配置
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  const pagination = {  //页码配置
    defaultCurrent: 1,
    current: currentIndex,
    total: total,
    onChange: (page) => {
      changePageIndex(page)
    }
  }

  function closeTagEditorModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        rowSelection={rowSelection}
        loading={!dataSource}
      />
      <Modal
        title="修改标签名"
        open={isModalOpen}
        onCancel={closeTagEditorModal}
        footer={null}
      >
        <Form style={{ marginTop: '30px' }}>
          <Form.Item
            label="标签名"
            name="tagname"
            rules={[
              {
                required: true,
                message: '标签名不能为空！',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button onClick={closeTagEditorModal}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default TagsList