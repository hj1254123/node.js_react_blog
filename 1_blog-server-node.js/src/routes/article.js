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
    res.status(500).json('添加文章出错，注意处理')
  }
})

router.delete('/', function(req, res) {
  try {
    const data = articleModel.delArticle(req.body.articleID)
    res.json(data)
  } catch(error) {
    res.status(500).json('删除文章出错，注意处理')
  }
})

router.delete('/batch', function(req, res) {
  try {
    const data = articleModel.delArticles(req.body.articlesID)
    res.json(data)
  } catch(error) {
    res.status(500).json('批量删除文章出错，注意处理')
  }
})

router.put('/', function(req, res) {
  const articleData = req.body
  try {
    const data = articleModel.putArticle(articleData)
    res.json(data)
  } catch(error) {
    res.status(500).json('修改文章出错，注意处理')
  }
})

router.get('/:id', function(req, res) {
  try {
    const articleID = parseInt(req.params.id)
    const data = articleModel.getArticle(articleID)
    res.json(data)
  } catch(error) {
    res.status(500).json('获取文章出错，注意处理')
  }
})

router.get('/page/:id', function(req, res) {
  try {
    const pageN = parseInt(req.params.id)
    const data = articleModel.getPage(pageN)

    if(data.data.length <= 0) { // 没有数据返回404
      res.status(404).send('该页没有数据')
    } else {
      res.json(data)
    }
  } catch(error) {
    res.status(500).json('获取某页文章列表出错，注意处理')
  }
})


module.exports = router