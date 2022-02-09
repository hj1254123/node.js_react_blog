const express = require('express')
const expressJwt = require('express-jwt')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

const { PUBLIC_KEY } = require('./constants/config.js')
// 路由
const authRouter = require('./routes/auth.js');
const articleRouter = require('./routes/article.js');
const tagsRouter = require('./routes/tags.js')
const commentRouter = require('./routes/comment.js');
const archiveRouter = require('./routes/archive.js')

const app = express()
const port = 3000

app.use(express.json())
// token解析验证中间件
// 成功，把用户信息赋值 req.user
// 失败，直接报错
app.use(expressJwt({
  secret: PUBLIC_KEY,
  algorithms: ['RS256'],
}).unless({
  // 这些路径不解析、验证
  path: [
    { url: '/', method: ['GET'] },
    { url: '/favicon.ico', method: ['GET'] },
    { url: '/auth/register', methods: ['POST'] },
    { url: '/auth/login', methods: ['POST'] },
    { url: /^\/article\/\d+$/, methods: ['GET'] },
    { url: /^\/article\/page\/\d+$/, methods: ['GET'] },
    { url: /^\/comment$/, methods: ['POST'] },
    { url: /^\/comment\/\d+$/, methods: ['GET'] },
    { url: /^\/archive\/\d+$/, methods: ['GET'] },
    { url: '/tags/page', methods: ['GET'] },
  ]
}))

// 日志
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// 路由
app.use('/auth', authRouter)
app.use('/article', articleRouter)
app.use('/tags', tagsRouter)
app.use('/comment', commentRouter)
app.use('/archive', archiveRouter)

// 错误处理
app.use(function(err, req, res, next) {
  console.log('===全局错误===', err)
  res.status(500).send('未知错误')
})


app.listen(port, function() {
  console.log(`服务器启动成功, 运行在http://localhost:${port}`);
})
