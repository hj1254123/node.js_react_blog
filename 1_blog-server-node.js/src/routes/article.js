const express = require('express')
const articleModel = require('../model/article')
const router = express.Router()

router.post('/', function(req, res) {
  // - 拿到数据
  const articleData = req.body
  // - 存文章数据（包含了tags）
  try {
    const data = articleModel.addArticle(articleData)
    res.json(data)
  } catch(error) {
    res.json('添加文章出错，注意处理', error)
  }
})

router.delete('/', function(req, res, next) {
  console.log(req.uesr);
  res.json('删除文章')
})

router.put('/', function(req, res) {
  res.json('修改文章')
})

router.get('/:id', function(req, res) {
  const articleID = req.params.id
  res.json(`获取文章:${articleID}`)
})



module.exports = router