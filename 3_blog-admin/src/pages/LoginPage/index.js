import React, { memo } from 'react'
import { ApiOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Button, Checkbox, Form, Input, Space } from 'antd'

import { useAuthContext } from '../../context/auth-context'
import { LoginWrapper } from './style'
import { useState } from 'react'


const LoginPage = memo(() => {
  const { user, login, logout } = useAuthContext()

  const [pageSwitch, setPageSwitch] = useState('登录')

  const onLoginFinish = (values) => {
    console.log('login form: ', values);
  }
  const onRegisterFinish = (values) => {
    console.log('register form: ', values);
  }
  const LoginForm = <Form
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
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
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
        <Button type="primary" htmlType="submit" className="login-form-button" block>
          登录
        </Button>
        <Button block>
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

  const RegisterForm = <Form
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

  return (
    <LoginWrapper>
      <Card
        title={pageSwitch}
        bordered={false}
        style={{
          width: 360,
        }}
      >
        {pageSwitch === '登录' ? LoginForm : RegisterForm}
      </Card>
    </LoginWrapper>

  )
})



export default LoginPage