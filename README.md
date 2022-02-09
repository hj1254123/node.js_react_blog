# React-Node.js-Blog
前后端分离的blog程序，包含三个部分：

- Node.js 接口服务器
- React 前端
- React 后台管理系统

> 本项目是对我18年写的[博客程序](https://github.com/hj1254123/NodeJs_Blog)的重构。

## Node.js 接口服务器

开发从 [数据文档](0_doc/1.数据文档.md)、[接口文档](0_doc/1.接口.md) 的设计开始。

使用到的技术如下：

- 框架：`express` 
- 鉴权：采用 JWT 方案。使用 `jsonwebtoken` 颁发 token，`express-jwt` 解析验证。
- 使用 `morgan` 记录日志。
- `Postman` 做接口测试
- `Nginx` 代理转发、`PM2` 进程管理，。

> 开发本接口服务器，更多的是为了学习目的，比如：
>
> - 学习鉴权方案：cookie-session、JWT
> - 更多的使用 ES6+ 语法
> - 安全考虑：防 `xss` 攻击，过滤用户输入；对用户数据进行校验；登录防暴力破解；单ip访问频率限制；密码的hash加盐处理…
> - 较于18年版本开发了更多的接口、代码结构优化
>
> 开发中基本上是现学现用，待系统的学习后端开发后，还需重构。
