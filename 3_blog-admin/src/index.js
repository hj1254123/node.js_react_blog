import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import ErrorBoundary from './components/ErrorBoundary'
import AppProviders from './context'
import LoginPage from './pages/LoginPage'
import Error404 from './components/Error404'
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
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/404' element={<Error404 />} />
            <Route path='*' element={<App />} />
          </Routes>
        </ConfigProvider>
      </AppProviders>
    </BrowserRouter>
  </ErrorBoundary>
)
