import React, { memo, useState } from 'react'
import { Button, Form, Input, Modal, Space, Table } from 'antd'


const TagsList = memo((props) => {
  const {
    dataSource, setSelectedRowKeys,
    changePageIndex, currentIndex,
    total, modifyTagName,
    delTagsUseModal, isLoading
  } = props

  const [form] = Form.useForm()

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentEditTag, setCurrentEditTag] = useState({ tagID: 0, tagName: '' }) //当前正在编辑的标签对象

  const columns = [ //列配置
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
          <Button
            type="primary"
            onClick={() => {
              setIsEditModalOpen(true)
              tagEditing(record)
            }}
          >
            编辑</Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              delTagsUseModal([record.key])
            }}
          >
            删除</Button>
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
    setIsEditModalOpen(false)
  }

  function tagEditing(tagObj) {
    form.setFieldValue('tagname', tagObj.tagName)
    setCurrentEditTag({
      tagName: tagObj.tagName,
      tagID: tagObj.key
    })
  }

  async function onEditTagFormFinish() {
    setLoading(true)
    await modifyTagName(currentEditTag)
    setLoading(false)
    closeTagEditorModal()
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        rowSelection={rowSelection}
        loading={isLoading}
      />
      <Modal
        title="修改标签名"
        open={isEditModalOpen}
        onCancel={closeTagEditorModal}
        footer={null}
      >
        <Form
          style={{ marginTop: '30px' }}
          form={form}
          onFinish={onEditTagFormFinish}
        >
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
            <Input
              autoComplete='off'
              onChange={(e) => {
                setCurrentEditTag({ ...currentEditTag, tagName: e.target.value })
              }} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
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