const express = require('express')
const router = express.Router()

router.post('/', function(req, res) {
  // 拿到数据
  const articleData = req.body
  // 校验、转义数据

  // 存数据库

  // 返回处理结果
  res.json(req.body)
})

router.delete('/', function(req, res, next) {
  res.json('删除文章')
})

router.put('/', function(req, res) {
  res.json('修改文章')
})

router.get('/:id', function(req, res) {
  res.json('获取某篇文章')
})

module.exports = router