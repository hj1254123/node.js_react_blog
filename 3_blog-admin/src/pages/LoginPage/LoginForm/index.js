import React, { memo } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Space } from 'antd'

const LoginForm = memo(({ onLoginFinish, setPageSwitch, goDirectly }) => {
  return (
    <div>
      <Form
        name="login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onLoginFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入你的用户名！',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入你的密码！',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Space
            direction="vertical"
            size="middle"
            style={{
              display: 'flex',
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              登录
            </Button>
            <Button block onClick={goDirectly} >
              直接进入
            </Button>
            <div>
              Or&nbsp;
              <a onClick={e => {
                e.preventDefault = false
                setPageSwitch('注册')
              }}>注册</a>
            </div>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
})

export default LoginForm