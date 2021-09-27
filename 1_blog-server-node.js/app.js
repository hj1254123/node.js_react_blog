const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, function() {
    console.log(`服务器启动成功, 运行在http://localhost:${port}`);
})
