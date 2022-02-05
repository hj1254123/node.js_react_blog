const express = require('express')
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
      return res.json('技能冷却中')
    }
    ipSet.add(ip)
    setTimeout(() => {
      ipSet.delete(ip)
    }, 20000)

    // 添加评论
    const data = commentModel.addCommentToArticle(commentData)
    res.json(data)
  } catch(error) {
    console.log(error)
    res.status(500).json('添加评论接口出错,注意处理')
  }
})

// 根据文章id和评论id删除评论
router.delete('/', (req, res) => {
  try {
    const { articleID, commentID } = req.body
    const data = commentModel.delCommentToArticle(articleID, commentID)
    res.json(data)
  } catch(error) {
    res.status(500).json('删除评论出错,注意处理')
  }
})

// 根据文章id获取评论数组
router.get('/:id', (req, res) => {
  const articleID = parseInt(req.params.id)
  res.json(articleID)
})

module.exports = router