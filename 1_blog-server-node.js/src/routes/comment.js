const express = require('express')
const cacheMiddleware = require('../middleware/cache')
const { getComments } = require('../model/comment')
const commentModel = require('../model/comment')

const router = express.Router()

// 存客户端ip
const ipSet = new Set()

// 根据文章id添加评论
router.post('/', (req, res) => {

  try {
    const ip = req.ip
    const commentData = { ...req.body, ip }

    // 限制单个ip评论频率
    if(ipSet.has(ip)) {
      return res.json({
        message: '评论太频繁了，请歇一会儿~'
      })
    }
    ipSet.add(ip)
    setTimeout(() => {
      ipSet.delete(ip)
    }, 10000)

    // 添加评论
    const data = commentModel.addCommentByArticleID(commentData)

    res.json(data)
  } catch(error) {
    console.log(error)
    res.status(500).json('添加评论出错,注意处理')
  }
})

// 根据文章id和评论id删除对应评论
router.delete('/', (req, res) => {
  try {
    const { articleID, commentID } = req.body
    const data = commentModel.delCommentByArticleIDAndCommentID(articleID, commentID)
    res.json(data)
  } catch(error) {
    res.status(500).json('删除评论出错,注意处理')
  }
})

// 获取所有评论（10条/页）
router.get('/page/:num', cacheMiddleware(10), (req, res) => {
  try {
    const pageN = parseInt(req.params.num)
    const data = commentModel.getComments(pageN)
    res.json(data)
  } catch(error) {
    res.status(500).json('获取所有评论出错,注意处理')
  }
})

// 根据文章id获取评论
router.get('/:id', (req, res) => {
  try {
    console.log(1)
    const articleID = parseInt(req.params.id)
    const data = commentModel.getCommentByArticleID(articleID)
    res.json(data)
  } catch(error) {
    res.status(500).json('获取评论出错,注意处理')
  }
})



module.exports = router