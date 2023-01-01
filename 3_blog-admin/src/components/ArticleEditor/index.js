import React, { memo, useEffect, useRef, useState } from 'react'
import MdEditor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import { Button, Drawer, Form, Input, message, Modal, Space, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import hjRequest from '../../services/request'

const ArticlesEditor = memo(({ isopen, setIsopen, title = '新建文章', articleKey, mutate }) => {
  const [articleData, setArticleData] = useState({
    articleID: 0,
    title: '',
    intro: '',
    content: '',
    tags: [],
  })
  const [inputTagValue, setInputTagValue] = useState('')
  const [inputTagVisible, setInputTagVisible] = useState(false)
  const [tagsErrorMessage, setTagsErrorMessage] = useState('') //标签校验提示信息

  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => { //如果是编辑文章，根据id获取文章数据，并储存状态
    if(title === '编辑文章') {
      hjRequest
        .get(`/article/${articleKey}`)
        .then(res => {
          if(res.message === '成功') {
            //这几个数据有Form管理，所以直接设置
            form.setFieldValue('title', res.data.title)
            form.setFieldValue('intro', res.data.intro)
            form.setFieldValue('content', res.data.content)
            // 下面数据由当前组件管理
            setArticleData({
              articleID: res.data.id,
              title: res.data.title,
              intro: res.data.intro,
              content: res.data.content,
              tags: res.data.tags.map(item => item.tagName),
            })
          }
        })
    }
  }, [title, articleKey, form])

  const inputTagRef = useRef()
  useEffect(() => { //自动聚焦inputTag框
    if(inputTagVisible) {
      inputTagRef.current?.focus()
    }
  }, [inputTagVisible])

  async function submitForm() {
    messageApi.open({
      key: 'submitLoading',
      type: 'loading',
      duration: 0,
      content: '提交中...',
    })
    try {
      if(title === '新建文章') {
        const res = await hjRequest.post('/article', articleData)
        if(res.message === '文章添加成功') {
          messageApi.success(res.message)
          clearForm()
        } else {
          messageApi.error(res.message || '未知错误')
        }
      } else {
        const res = await hjRequest.put('/article', articleData)
        if(res.message === '文章修改成功') {
          messageApi.success(res.message)
        } else {
          messageApi.error(res.message || '未知错误')
        }
      }
    } catch(error) {
      messageApi.error(error.data || '添加/编辑文章出错')
    }
    messageApi.destroy('submitLoading')
    mutate() //数据变了，swr重新验证'/article/page/:id'
  }

  function onFinish() {
    if(articleData.tags.length === 0) {
      setTagsErrorMessage('标签为必填!')
      message.error('标签为必填！')
      return
    }
    Modal.confirm({
      content: '确定要提交吗？',
      onOk: () => submitForm()
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
    const newTags = articleData.tags.filter(tag => tag !== tagName)
    setArticleData({
      ...articleData,
      tags: newTags,
    })
  }

  function handleInputTagChange(e) {
    setTagsErrorMessage('') //取消tag校验提示文字
    setInputTagValue(e.target.value)
  }

  function handleInputTagConfirm() {
    setInputTagVisible(false)
    if(!inputTagValue) return
    const newTags = Array.from(new Set([...articleData.tags, inputTagValue])) //去重
    setArticleData({
      ...articleData,
      tags: newTags,
    })
    setInputTagValue('')
  }

  function showInputTag() {
    setInputTagVisible(true)
  }

  function clearForm() {
    form.resetFields() //重置form到初始值
    setArticleData({ ...articleData, content: '', tags: [] })
  }

  function onValuesChange(changedValues, allValues) {
    setArticleData({ ...articleData, title: allValues.title, intro: allValues.intro })
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
        onValuesChange={onValuesChange}
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
          <Input />
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
              articleData.tags.map(tag => <Tag
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
          <MdEditor
            modelValue={articleData.content}
            onChange={(content) => {
              setArticleData({ ...articleData, content: content })
            }}
            style={{ height: '80vh' }} />
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