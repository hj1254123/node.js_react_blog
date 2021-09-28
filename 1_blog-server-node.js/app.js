const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// 路由
var articleRouter = require('./routes/article.js');
app.use('/article', articleRouter);

app.listen(port, function() {
    console.log(`服务器启动成功, 运行在http://localhost:${port}`);
})
