const express = require('express')
const articleModel = require('../model/article')
const router = express.Router()

router.post('/', function(req, res) {
  // console.log(req.user);
  // - 拿到数据
  const articleData = req.body
  // - 存文章数据
  articleModel
    .addArticle(articleData)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      console.log('article catch 捕获：', err)
    })
  // TODO: tgs 交给tgsModel处理，最后整体结果再返回给客户端，上方和articlesModel代码需要修改
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