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
  next(new Error('删除文章出错'))
})

router.put('/', function(req, res) {
  res.json('修改文章')
})

router.get('/:id', function(req, res) {
  res.json('获取某篇文章')
})

// 错误处理
router.use(function(err, req, res, next) {
  console.log(err.message);
  res.status(500).send(err.message);
})


module.exports = router