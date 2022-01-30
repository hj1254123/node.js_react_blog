const express = require('express')
const expressJwt = require('express-jwt')

const { PUBLIC_KEY } = require('./constants/config.js')
// 路由
const authRouter = require('./routes/auth.js');
const articleRouter = require('./routes/article.js');
const tagsRouter = require('./routes/tags.js')

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
    { url: '/auth/register', methods: ['POST'] },
    { url: '/auth/login', methods: ['POST'] },
    { url: /^\/article\/\d+$/, methods: ['GET'] },
  ]
}))

// 路由
app.use('/auth', authRouter)
app.use('/article', articleRouter)
app.use('/tags', tagsRouter)


// 错误处理
app.use(function(err, req, res, next) {
  // TODO: 根据错误信息，返回特定状态码、message
  console.log('全局错误处理', err.message);
  console.log(err.name);
  res.status(500).send(err.message);
})


app.listen(port, function() {
  console.log(`服务器启动成功, 运行在http://localhost:${port}`);
})
