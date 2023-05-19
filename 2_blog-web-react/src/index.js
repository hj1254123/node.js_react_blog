import 'react-app-polyfill/stable'; //兼容在 browserslist 中定义的浏览器
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";
import AppProviders from './context' //全局状态
import 'normalize.css' //样式规范化
import './assets/global.css' //样式重置、全局样式
import './assets/iconfont/iconfont.css' //图标

import { ErrorBoundary } from './components'
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container)

root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  </ErrorBoundary>
);
