const express = require('express')
const articleModel = require('../model/article.js')
const tagAndArticleModel = require('../model/tag&article.js')
const tagsModel = require('../model/tags.js')

const cacheMiddleware = require('../middleware/cache')

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
    const tagID = req.body.tagID
    // 删除该标签
    const data = tagsModel.delTag(tagID)
    if(data.message === '删除该标签成功') {
      // 删除所有包含该tagID的关系项
      tagAndArticleModel.delItemsBasedOnTheTagID(tagID)
    }
    res.json(data)
  } catch(error) {
    console.log(error)
    res.status(500).json('删除标签出错，注意处理')
  }
})
// 批量删除某个标签（有这些标签的所有文章，都删除该标签）
router.delete('/batch', function(req, res) {
  try {
    const tagsIDArr = req.body.tagsIDArr
    // 删除该标签
    const data = tagsModel.delTags(tagsIDArr)
    if(data.message === '批量删除标签成功') {
      // 删除所有包含该tagsIDArr的关系项
      tagAndArticleModel.delItemsBasedOnTheTagsIDArr(tagsIDArr)
    }
    res.json(data)
  } catch(error) {
    console.log(error)
    res.status(500).json('删除标签出错，注意处理')
  }
})
// 修改某个标签名称
router.put('/', function(req, res) {
  try {
    const { tagID, tagName } = req.body
    const data = tagsModel.putTagName(tagID, tagName)
    res.json(data)
  } catch(error) {
    console.log(error);
    res.status(500).json('修改标签名出错，注意处理')
  }
})

// 标签页 - 获取所有标签和标签对应文章
router.get('/page', cacheMiddleware(2), function(req, res) {
  try {
    // - 拿到标签数据
    const tagsArr = tagsModel.getTagsArr()
    // 该对象用于存放 tagName 映射对应的文章数组
    const tagNameMapsToArticleArrObj = {}
    // 添加映射数据
    for(const tag of tagsArr) {
      // 根据 tagID 拿到其对应的 articleIDArr
      const articleIDArr = tagAndArticleModel.getArticleIDArrBasedOnTagID(tag.id)
      // 根据 articleIDArr 拿到其对应的 articleDataArr
      const articleDataArr = articleModel.getArticleArrBasedOnTheArticleIDArr(articleIDArr)
      // 给每篇文章追加 tagsData，并删除不需要的文章内容、简介
      for(const item of articleDataArr) {
        item.tags = tagsModel.getTagsArrBasedOnTheArticleID(item.id)
        delete item.content
        delete item.intro
      }
      tagNameMapsToArticleArrObj[tag.tagName] = articleDataArr
    }
    // - 返回
    res.json([tagsArr, tagNameMapsToArticleArrObj])
  } catch(error) {
    console.log(error)
    res.status(500).json('标签页接口出错，注意处理')
  }
})


module.exports = router