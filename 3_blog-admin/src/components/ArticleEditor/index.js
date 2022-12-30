import React, { memo, useEffect, useRef, useState } from 'react'
import MdEditor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import { Button, Drawer, Form, Input, message, Modal, Space, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import hjRequest from '../../services/request'

const ArticlesEditor = memo(({ isopen, setIsopen, title = '新建文章' }) => {
  const [text, setText] = useState('')
  const [tags, setTags] = useState([])
  const [inputTagValue, setInputTagValue] = useState('')
  const [inputTagVisible, setInputTagVisible] = useState(false)
  const [tagsErrorMessage, setTagsErrorMessage] = useState('') //标签校验提示信息

  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const inputTagRef = useRef()
  useEffect(() => { //自动聚焦inputTag框
    if(inputTagVisible) {
      inputTagRef.current?.focus()
    }
  }, [inputTagVisible])

  async function submitForm(data) {
    messageApi.open({
      key: 'submitLoading',
      type: 'loading',
      duration: 0,
      content: '提交中...',
    })
    try {
      const res = await hjRequest.post('/article', data)
      if(res.message === '文章添加成功') {
        messageApi.success(res.message)
        clearForm()
      }
    } catch(error) {
      messageApi.error(error.data || '添加文章出错')
    }
    messageApi.destroy('submitLoading')
  }

  function onFinish(value) {
    const data = { ...value }
    data.tags = tags
    if(tags.length === 0) {
      setTagsErrorMessage('标签为必填!')
      message.error('标签为必填！')
      return
    }
    Modal.confirm({
      content: '确定要提交吗？',
      onOk: () => submitForm(data)
    })
  }

  function onCloseDrawer() {
    Modal.confirm({
      content: '确定要退出吗？',
      onOk: () => {
        setIsopen(false)
      }
    })
  }

  function onFinishFailed() {
    message.error('表单校验失败，请检查！')
  }

  function delTag(tagName) {
    const newTags = tags.filter(tag => tag !== tagName)
    setTags(newTags)
  }

  function handleInputTagChange(e) {
    setTagsErrorMessage('') //取消tag校验提示文字
    setInputTagValue(e.target.value)
  }

  function handleInputTagConfirm() {
    setInputTagVisible(false)
    if(!inputTagValue) return
    const newTags = Array.from(new Set([...tags, inputTagValue])) //去重
    setTags(newTags)
    setInputTagValue('')
  }

  function showInputTag() {
    setInputTagVisible(true)
  }

  function clearForm() {
    form.resetFields() //重置form到初始值
    setText('') //这两个属性没有被form管理，手动清除
    setTags([])
  }

  return (
    <Drawer
      title={title}
      placement='top'
      onClose={onCloseDrawer}
      open={isopen}
      height='100vh'
    >
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{
          flex: '80px',
        }}
      >
        <Form.Item
          name='title'
          label='文章标题'
          rules={[
            {
              required: true,
              message: '60字数限制',
              min: 0,
              max: 60,
            }
          ]}
        >
          <Input value={FormData.title} />
        </Form.Item>
        <Form.Item
          name='intro'
          label='文章简介'
        >
          <Input.TextArea showCount maxLength={200} />
        </Form.Item>
        <Form.Item
          name='tags'
          label='标签'
          required={true}
          validateStatus='error'
          help={tagsErrorMessage}
        >
          <Space>
            {
              tags.map(tag => <Tag
                key={tag}
                color="#2db7f5"
                closable={true}
                onClose={e => {
                  e.preventDefault()
                  delTag(tag)
                }}
              >
                {tag}
              </Tag>)
            }
            {
              inputTagVisible ? <Input
                ref={inputTagRef}
                type="text"
                size="small"
                value={inputTagValue}
                onChange={handleInputTagChange}
                onBlur={handleInputTagConfirm}
                onPressEnter={handleInputTagConfirm}
                style={{
                  width: 78,
                }}
              /> :
                <Tag onClick={showInputTag}>
                  <PlusOutlined /> New Tag
                </Tag>
            }
          </Space>
        </Form.Item>
        <Form.Item
          name='content'
          label='内容'
          rules={[{
            required: true
          }]}
        >
          <MdEditor modelValue={text} onChange={setText} style={{ height: '80vh' }} />
        </Form.Item>
        <Form.Item
          style={{
            textAlign: 'center'
          }}
        >
          <Space>
            <Button onClick={clearForm}>清空</Button>
            <Button
              type="primary"
              danger
              onClick={onCloseDrawer}
            >
              退出
            </Button>
            <Button type="primary" htmlType="submit">提交</Button>
          </Space>
        </Form.Item>
      </Form>
      {contextHolder}
    </Drawer>
  )
})

export default ArticlesEditor