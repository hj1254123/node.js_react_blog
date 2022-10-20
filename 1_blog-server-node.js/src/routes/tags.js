const express = require('express')
const articleModel = require('../model/article.js')
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
// TODO: 该接口时间复杂度太高了，待优化。
router.get('/page', function(req, res) {
  try {
    // - 拿到标签数据
    const tagsArr = tagsModel.getTagsArr()

    // - 拿到标签id对应文章数据
    // 遍历得到所有标签id
    const tagIDArr = []
    for(const item of tagsArr) {
      tagIDArr.push(item.id)
    }
    // 用于存标签id对应文章数据
    const tagNameMapsToArticleArrObj = {}
    // 添加映射数据
    for(const tagID of tagIDArr) {
      // 根据标签拿到文章id数组
      const articleIDArr = tagAndArticleModel.getArticleIDArrBasedOnTagID(tagID)
      // 根据文章id数组拿到对应数据arr
      const articleArr = articleModel.getArticleArrBasedOnTheArticleIDArr(articleIDArr)
      // 给每篇文章追加标签数据，并删除不需要的文章内容、简介
      for(const item of articleArr) {
        item.tags = tagsModel.getTagsArrBasedOnTheArticleID(item.id)
        delete item.content
        delete item.intro
      }
      // 拿到标签名称
      const tag = tagsArr.find(item => {
        return item.id === tagID
      })
      const key = tag.tagName
      // 添加映射关系
      tagNameMapsToArticleArrObj[key] = articleArr
    }

    // - 返回
    res.json([tagsArr, tagNameMapsToArticleArrObj])
  } catch(error) {
    console.log(error)
    res.status(500).json('标签页接口出错，注意处理')
  }
})


module.exports = router