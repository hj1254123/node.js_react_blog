import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import 'normalize.css' // 样式规范化
import './assets/reset.css' // 样式重置

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
