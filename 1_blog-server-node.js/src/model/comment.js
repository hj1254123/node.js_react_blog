const fs = require('fs')
const path = require("path")
const xss = require("xss")

const commentModel = {}
module.exports = commentModel

const articleModel = require('./article')

const commentsDBPath = path.resolve(__dirname, '../db/comments.json')

// 根据文章id添加评论
commentModel.addCommentByArticleID = function(commentData) {
  // - 待返回数据
  const data = {
    message: "",
    data: {}
  }
  // - 数据校验
  const result1 = addCommentToArticleVerification(commentData)
  if(!result1.boolean) {
    data.message = result1.message
    return data
  }
  // - xss安全过滤
  const safeCommentData = addCommentToArticleXssFilter(commentData)
  // - 保存评论（其中检查是否存在对应的文章；限制单篇文章评论数500条。）
  const { articleID, userName, email, content, ip } = safeCommentData
  // 检查是否存在对应的文章
  const result2 = articleModel.checkIfTheArticleExists(articleID)
  // 如果不存在直接返回结果
  if(!result2.boolean) {
    data.message = result2.message
    return data
  }
  // 待保存对象
  const newComment = {
    articleID,
    userName,
    email,
    content,
    ip,
    id: 0,
    time: 0
  }
  // 读取评论db
  const commentDB = getCommentDB()
  
  // 限制评论数量500条
  const commentDataBasedArticleID = commentDB.filter(item => item.articleID === articleID)
  if(commentDataBasedArticleID.length >= 500) {
    data.message = '评论数量超过限制'
    return data
  }
  // 计算唯一ID
  let lastItem = commentDB[commentDB.length - 1]
  if(lastItem === undefined) {
    newComment.id = 1
  } else {
    newComment.id = lastItem.id + 1
  }
  // 时间
  newComment.time = new Date().getTime()
  // push并保存
  commentDB.push(newComment)
  save(commentDB)
  // - 返回结果
  data.message = '添加评论成功'
  data.data = {
    id: newComment.id,
    tiem: newComment.time,
    articleID,
    userName,
    email,
    content
  }
  return data
}

// 根据文章id和评论id删除对应评论
commentModel.delCommentByArticleIDAndCommentID = function(articleID, commentID) {
  // - 待返回数据
  const data = {
    message: '',
    data: {
      articleID,
      commentID
    }
  }
  // - 校验数据
  if(typeof articleID !== 'number' || typeof commentID !== 'number') {
    data.message = 'id只能为数字'
    return data
  }
  // - 删除对应评论
  const commentsDB = getCommentDB()
  // 找到下标
  const index = commentsDB.findIndex(item => {
    return (item.id === commentID) && (item.articleID === articleID)
  })
  if(index === -1) {
    data.message = '没有该文章评论，操作失败'
    return data
  }
  // 删除
  commentsDB.splice(index, 1)
  // 保存
  save(commentsDB)
  // - 返回结果
  data.message = '评论删除成功'
  return data
}

// 根据文章id获取评论
commentModel.getCommentByArticleID = function(articleID) {
  // 待返回数据
  const data = {
    message: '',
    data: []
  }
  const commentDB = getCommentDB()
  data.data = commentDB.filter(item => item.articleID === articleID)
  data.data = data.data.map(item => {
    delete item.ip
    delete item.email
    return item
  })
  // 返回数据
  data.message = '获取评论成功'
  data.data = data.data.reverse()
  return data
}
/**
 * 下面是一些工具函数
 */

// 读取并返回评论数据文档
function getCommentDB() {
  return JSON.parse(fs.readFileSync(commentsDBPath))
}

// 保存评论数据文档
function save(commentsData) {
  fs.writeFileSync(commentsDBPath, JSON.stringify(commentsData))
}


// 添加评论接口数据校验
function addCommentToArticleVerification(commentData) {
  // 待返回的结果，默认通过
  let result = { message: '校验通过', boolean: true }
  
  // 逐一校验
  let { articleID, userName, email, content } = commentData
  let checkArticleID = typeof articleID === 'number'
  let checkUserName = (typeof userName === 'string') && (userName.length < 20) &&  (userName.length > 0)
  let checkEmail = (typeof email === 'string') && (email.length < 30) && (email.length > 6)
  if(checkEmail) {
    let regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    checkEmail = regexp.test(email)
  }
  let checkContent = (typeof content === 'string') && (content.length < 1000) && (content.length > 0)

  // 给每一项校验失败设置 message
  if(!checkArticleID) {
    result.message = '文章id校验失败'
  } else if(!checkUserName) {
    result.message = '用户名校验失败'
  } else if(!checkEmail) {
    result.message = '邮箱校验失败'
  } else if(!checkContent) {
    result.message = '评论内容校验失败'
  }

  // 只要有一项校验失败，直接返回结果
  if(!checkArticleID || !checkUserName || !checkEmail || !checkContent) {
    result.boolean = false
    return result
  }

  // 成功返回结果
  return result
}

// 添加评论接口XSS过滤
function addCommentToArticleXssFilter(commentData) {
  let { userName, email, content } = commentData

  commentData.userName = xss(userName)
  commentData.email = xss(email)
  commentData.content = content //评论内容，交给前端过滤。

  return commentData
}
