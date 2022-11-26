import React, { memo } from 'react'
import { ApiOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'

const RegisterForm = memo(({ onRegisterFinish, setPageSwitch }) => {
  return (
    <Form
      name="register"
      className="register-form"
      onFinish={onRegisterFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名！',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item
        name="invitationCode"
        rules={[
          {
            required: true,
            message: '请输入邀请码！',
          },
        ]}
      >
        <Input
          prefix={<ApiOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="邀请码"
        />
      </Form.Item>


      <Form.Item>
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: 'flex',
          }}
        >
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            注册
          </Button>
          <Button
            block
            onClick={() => {
              setPageSwitch('登录')
            }}
          >
            返回登录
          </Button>

        </Space>
      </Form.Item>
    </Form>
  )
})

export default RegisterForm