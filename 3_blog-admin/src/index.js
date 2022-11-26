import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'


import ErrorBoundary from './components/ErrorBoundary'
import AppProviders from './context'
import App from './App'

import 'normalize.css'
import './assets/global.css'
import 'antd/dist/reset.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <AppProviders>
        <ConfigProvider locale={zhCN}>
          <App />
        </ConfigProvider>
      </AppProviders>
    </BrowserRouter>
  </ErrorBoundary>
)
