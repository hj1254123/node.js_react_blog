const express = require('express')
const articleModel = require('../model/article')
const router = express.Router()

router.post('/', function(req, res) {
  // - 拿到数据
  const articleData = req.body
  // - 存文章数据（包含了tags）
  articleModel
    .addArticle(articleData)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
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