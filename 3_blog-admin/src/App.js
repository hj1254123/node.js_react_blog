import logo from './assets/logo.png'

import React, { useState } from 'react';
import {
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  TagsOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{
      minHeight: '100vh',
    }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{
          backgroundColor: '#fff',
          width: '100%',
          textAlign: 'center'
        }}>
          <img src={logo} alt="HouJI's博客管理系统" style={{
            width: '70%',
          }} />
        </div>
        <Menu
          style={{
            minHeight: '100vh'
          }}
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '/home',
              icon: <UserOutlined />,
              label: '首页',
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
          ]}
          onClick={({ key }) => {
            console.log(key)
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: '0 15px',
            backgroundColor: '#fff',
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;