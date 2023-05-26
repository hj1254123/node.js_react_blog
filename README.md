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
- 使用 `morgan` 记录 HTTP 日志、`log4js` 记录错误日志。
- `Postman` 做接口测试
- `Nginx` 代理转发、`PM2` 进程管理。
- 使用 `SM.MS` 图床，`multer` 处理上传来的图片。

> 开发本接口服务器，更多的是为了学习目的，比如：
>
> - 学习鉴权方案：cookie-session、JWT
> - 更多的使用 ES6+ 语法
> - 安全考虑：防 `xss` 攻击，过滤用户输入；对用户数据进行校验；登录防暴力破解；单ip访问频率限制；密码的hash加盐处理…
> - 较于18年版本开发了更多的接口、代码结构优化
>
> 开发中基本上是现学现用，待系统的学习后端开发后，还需重构。

## 项目初始化

> 由于考虑不周，三个项目放在了同一个库里，之后会分开，暂时这样。

在各自文件夹运行 `npm i ` 安装依赖。

### Node.js 接口服务器

在 `/node.js_react_blog/1_blog-server-node.js/src/constants/secret/` 下创建几个文件：

- md5_salt：密码加盐，如：`jdslsdlwww1111`。
- registry_invitation_code：邀请码，用于注册用户，如：`7355608`。
- SMMS_token：用于图片上传至 SMMS 的 token，到[官网获取](https://sm.ms/home/apitoken)。
- private.key 和 private.key：本项目采用 JWT 鉴权，非对称加密，生成方式见：[./0_doc/2.接口.md##鉴权](./0_doc/2.接口.md)
