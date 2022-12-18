import logo from '../../assets/logo.png'
import avatar from '../../assets/avatar.png'

import React, { memo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  DashboardOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Avatar, Space, Dropdown } from 'antd'

import { AppLayoutWrapper } from './style'
import { useAuthContext } from '../../context/auth-context'
const { Header, Sider, Content } = Layout

const AppLayout = memo(({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthContext()

  const sliderMenuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: '/articles',
      icon: <FileTextOutlined />,
      label: '文章管理',
    },
    {
      key: '/tags',
      icon: <TagsOutlined />,
      label: '标签管理',
    },
    {
      key: '/comments',
      icon: <MessageOutlined />,
      label: '评论管理',
    }
  ]
  const userBoxItems = [
    { label: '登出', key: '/login', icon: <LogoutOutlined /> },
  ]

  return (
    <AppLayoutWrapper>
      <Layout className='layout-box'>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          onBreakpoint={setCollapsed}
        >
          <div className='logo'>
            <img src={logo} alt="HouJI's博客管理系统" />
          </div>
          <Menu
            className='slider-menu'
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            items={sliderMenuItems}
            onClick={({ key }) => {
              navigate(key)
            }}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className='header'>
            {
              React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })
            }
            <Dropdown
              menu={{
                items: userBoxItems,
                onClick: ({ key }) => {
                  logout()
                  navigate(key)
                }
              }}
            >
              <Space className="userInfo">
                <Avatar src={avatar} alt="avatar" />
                <span>{user?.userName}</span>
              </Space>
            </Dropdown>
          </Header>
          <Content className='content'>{children}</Content>
        </Layout>
      </Layout>
    </AppLayoutWrapper>
  )
})

export default AppLayout;