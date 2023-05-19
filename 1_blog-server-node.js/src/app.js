const express = require('express')
const { expressjwt } = require('express-jwt')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const multer = require('multer')

const { PUBLIC_KEY } = require('./constants/config.js')
const myCors = require('./middleware/myCors.js')

// 路由
const authRouter = require('./routes/auth.js')
const articleRouter = require('./routes/article.js')
const tagsRouter = require('./routes/tags.js')
const commentRouter = require('./routes/comment.js')
const archiveRouter = require('./routes/archive.js')
const dashboardRouter = require('./routes/dashboard.js')
const uploadRouter = require('./routes/upload.js')

const app = express()
const port = 3003

app.use(myCors) // 自定义允许跨域的url
app.use(express.json())

// token解析验证中间件
// 成功，把用户信息赋值 req.user
// 失败，直接报错
app.use(expressjwt({
  secret: PUBLIC_KEY,
  algorithms: ['RS256'],
}).unless({
  // 这些路径不解析、验证
  path: [
    { url: '/', method: ['GET'] },
    { url: '/favicon.ico', method: ['GET'] },
    { url: '/auth/register', methods: ['POST', 'OPTIONS'] },
    { url: '/auth/login', methods: ['POST', 'OPTIONS'] },
    { url: /^\/article\/\d+$/, methods: ['GET'] },
    { url: /^\/article\/page\/\d+$/, methods: ['GET'] },
    { url: '/comment', methods: ['POST', 'OPTIONS'] },
    { url: /^\/comment\/\d+$/, methods: ['GET'] },
    { url: /^\/comment\/page\/\d+$/, methods: ['GET'] },
    { url: /^\/archive\/\d+$/, methods: ['GET'] },
    { url: '/tags/page', methods: ['GET'] },
    { url: '/dashboard/basic_statistics', methods: ['GET'] },
    { url: /^\/dashboard\/annual_article_statistics\/\w+$/, methods: ['GET'] },
    // { url: '/test', methods: ['GET', 'OPTIONS'] },
  ]
}))

// 日志
// TODO：上线时开启日志功能
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })

// setup the logger
// app.use(morgan('combined', { stream: accessLogStream }))

// 路由
app.use('/auth', authRouter)
app.use('/article', articleRouter)
app.use('/tags', tagsRouter)
app.use('/comment', commentRouter)
app.use('/archive', archiveRouter)
app.use('/dashboard', dashboardRouter)
app.use('/upload', uploadRouter)
// 测试接口
app.get('/test', function(req, res) {
  res.status(200).send('ok');
  // res.status(404).send('Not Found');
  // res.status(500).send('服务端错误');
  // res.status(301).send('');

})

app.get('*', function(req, res) {
  res.status(404).send('该接口未定义');
})

// 全局错误处理
app.use(function(err, req, res, next) {
  console.log('===全局错误===', err)
  // 默认值
  let status = 500
  let msg = '未知错误'

  // 由于后端管理和生产页面共用该程序，而生产不需要鉴权，
  // 按现在的写法没带正确token express-jwt 会报错，这里暂时这样处理
  if(err.name === 'UnauthorizedError') {
    // 管理页面返回401
    status = 401
    msg = 'token已过期，请重新登录！'
  }

  // multer 处理 formData的文件上传。全局错误，特殊处理一下。
  if(err instanceof multer.MulterError) {
    return res.status(500).json({ success: false, ...err })
  }

  res.status(status).send(msg)
})

app.listen(port, function() {
  console.log(`服务器启动成功, 运行在http://localhost:${port}`);
})
