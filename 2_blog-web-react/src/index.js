import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import AppProviders from './context'
import 'normalize.css' // 样式规范化
import './assets/reset.css' // 样式重置

import App from './App';

ReactDOM.render(
  <AppProviders>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProviders>,
  document.getElementById('root')
);
