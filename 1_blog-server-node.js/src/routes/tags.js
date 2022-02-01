const express = require('express')
const tagAndArticleModel = require('../model/tag&article.js')
const tagsModel = require('../model/tags.js')

const router = express.Router()

// 向某篇文章追加单个标签
router.post('/article', function(req, res) {
  try {
    const { articleID, tagName } = req.body
    const data = tagsModel.additionalTag(articleID, tagName)
    res.json(data)
  } catch(error) {
    res.status(500).json('向文章追加标签出错，注意处理')
  }
})

// 删除某篇文章的单个标签
router.delete('/article', function(req, res) {
  try {
    const { articleID, tagID } = req.body
    const data = tagAndArticleModel.removeTagFromArticle(articleID, tagID)
    res.json(data)
  } catch(error) {
    res.status(500).json('删除文章某个标签出错，注意处理')
  }
})

// 删除某个标签（有这个标签的所有文章，都删除该标签）
router.delete('/', function(req, res) {
  try {
    res.json('3')
  } catch(error) {
    res.status(500).json('删除标签出错，注意处理')
  }
})

// 修改某个标签名称
router.put('/', function(req, res) {
  try {
    res.json('4')
  } catch(error) {
    res.status(500).json('修改标签名出错，注意处理')
  }
})

module.exports = router