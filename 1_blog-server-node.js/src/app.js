const express = require('express')
const expressJwt = require('express-jwt')

const { PUBLIC_KEY } = require('./constants/config.js')
// 路由
var authRouter = require('./routes/auth.js');
var articleRouter = require('./routes/article.js');

const app = express()
const port = 3000

app.use(express.json())

app.use(expressJwt({
    secret: PUBLIC_KEY,
    algorithms: ['RS256']
}).unless({
    path: ['/auth/login']  // 指定路径不经过 Token 解析
}))

app.use('/auth', authRouter)
app.use('/article', articleRouter)


// 错误处理
app.use(function(err, req, res, next) {
    // TODO: 根据错误信息，返回特定状态码、message
    console.log('全局错误处理', err.message);
    res.status(500).send(err.message);
})


app.listen(port, function() {
    console.log(`服务器启动成功, 运行在http://localhost:${port}`);
})
