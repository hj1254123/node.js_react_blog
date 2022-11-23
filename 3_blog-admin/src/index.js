import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import ErrorBoundary from './components/ErrorBoundary'
import AppProviders from './context'
import App from './App'

import 'normalize.css'
import './assets/global.css'
import 'antd/dist/antd.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  </ErrorBoundary>
)
