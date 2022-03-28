import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from 'swr'
import 'normalize.css' // 样式规范化
import './assets/reset.css' // 样式重置

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <SWRConfig value={{
      onError: (error, key) => {
        console.log('swr全局错误处理', error, key)
      }
    }}>
      <App />
    </SWRConfig>
  </BrowserRouter>,
  document.getElementById('root')
);
