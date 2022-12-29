import React, { memo, useEffect, useRef, useState } from 'react'
import MdEditor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import { Button, Drawer, Form, Input, Space, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const ArticlesEditor = memo(({ isopen, setIsopen, title = '新建文章' }) => {
  const [text, setText] = useState('')
  const [tags, setTags] = useState([])
  const [inputTagValue, setInputTagValue] = useState('')
  const [inputTagVisible, setInputTagVisible] = useState(false)

  const inputTagRef = useRef()
  useEffect(() => {
    if(inputTagVisible) {
      inputTagRef.current?.focus()
    }
  }, [inputTagVisible])

  function onCloseDrawer() {
    setIsopen(false)
  }

  function onFinish(value) {
    const data = {...value}
    data.tags = tags
    console.log(data)
  }

  function handleTags(tagName) {
    const newTags = tags.filter(tag => tag !== tagName)
    setTags(newTags)
  }

  function handleInputTagChange(e) {
    setInputTagValue(e.target.value)
  }

  function handleInputTagConfirm() {
    setInputTagVisible(false)
    if(!inputTagValue) return
    setTags([...tags, inputTagValue])
    setInputTagValue('')
  }

  function showInputTag() {
    setInputTagVisible(true)
  }

  return (
    <Drawer
      title={title}
      placement='top'
      onClose={onCloseDrawer}
      open={isopen}
      height='100vh'
    >
      <Form onFinish={onFinish}>

        <Form.Item
          name='title'
          label='文章标题'
          rules={[
            {
              required: true,
              message: '文章标题60字数限制',
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
          rules={[{
            required: true
          }]}
        >
          <Space>

            {
              tags.map(tag => {
                return <Tag
                  key={tag}
                  color="#2db7f5"
                  closable={true}
                  onClose={e => {
                    e.preventDefault()
                    handleTags(tag)
                  }}
                >{tag}
                </Tag>
              })
            }

            {inputTagVisible ? <Input
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
          name='context'
          label='内容'
          rules={[{
            required: true
          }]}
        >
          <MdEditor modelValue={text} onChange={setText} style={{ height: '80vh' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </Drawer>
  )
})

export default ArticlesEditor