const fs = require("fs")
const path = require("path")
const xss = require("xss")

const tagsModel = require("./tags.js")
const tagAndArticleModel = require("./tag&article.js")

const articlesDBPath = path.resolve(__dirname, '../db/articles.json')

const articleModel = {}

articleModel.getArticlesData = () => {
  return JSON.parse(fs.readFileSync(articlesDBPath))
}

articleModel.save = (articlesData) => {
  fs.writeFileSync(articlesDBPath, JSON.stringify(articlesData))
}

articleModel.articleVerification = (articleData) => {
  let result = { message: '校验通过', boolean: true }
  let { title, intro, content, tags } = articleData
  // 标题不能为空、类型为string
  // 简介类型为string
  // 内容不能为空、类型为string
  // 标签必须为数组，且元素为string
  let checkTitle = !title || (typeof title !== 'string')
  let checkIntro = typeof intro !== 'string'
  let checkContent = !content || (typeof content !== 'string')
  let checkTags = !Array.isArray(tags)
  // 如果tags是数组，校验标签元素
  if(!checkTags) {
    tags.forEach(item => {
      if(typeof item !== 'string') {
        checkTags = true
      }
    })
  }

  if(checkTitle || checkIntro || checkContent || checkTags) {
    result.boolean = false
  }
  if(checkTitle) {
    result.message = '文章标题校验失败'
  } else if(checkIntro) {
    result.message = '文章简介校验失败'
  } else if(checkContent) {
    result.message = '文章内容校验失败'
  } else if(checkTags) {
    result.message = '文章标签校验失败'
  }
  // 全部校验通过
  return result
}

articleModel.articleSecurityHandling = (articleData) => {
  let data = {}
  let { title, intro, content, tags } = articleData
  data.title = xss(title)
  data.intro = xss(intro)
  data.content = xss(content)
  data.tags = []
  tags.forEach(item => {
    data.tags.push(item)
  })
  return data
}

// 添加文章
articleModel.addArticle = async (articleData) => {
  /**
   * 保存文章数据、返回文章id
   * 保存标签数据、返回标签id的数组
   * 根据两者id，保存关系文档数据
   */

  let data = {
    message: '',
    data: null
  }
  // 文章校验
  let result = articleModel.articleVerification(articleData)
  // 失败直接返回信息
  if(!result.boolean) {
    data.message = result.message
    return data
  }
  // 文章安全处理
  let { title, intro, content, tags } = articleModel.articleSecurityHandling(articleData)
  const newArticleData = {
    id: 1,
    time: 1,
    title: title,
    intro: intro,
    content: content
  }

  // 查询数据库，读取文章数据
  let articlesDB = articleModel.getArticlesData()
  // 计算文章唯一id
  let lastItem = articlesDB[articlesDB.length - 1]
  if(lastItem === undefined) {
    newArticleData.id = 1
  } else {
    newArticleData.id = lastItem.id + 1
  }
  // 创建时间
  newArticleData.time = new Date().getTime()
  // push并保存文章数据
  articlesDB.push(newArticleData)
  articleModel.save(articlesDB)
  // 拷贝一份
  data.data = { ...newArticleData }
  // 保存标签数据
  await tagsModel
    .addTags(tags)
    .then(tagsArr => {
      data.data.tags = tagsArr
    })
    .catch(err => {
      data.message = '标签保存出错'
      data.data = null
    })
  if(data.message === '标签保存出错') return data
  // 保存标签与文章关系数据文档
  await tagAndArticleModel
    .addTagArticle(data.data.id, data.data.tags)
    .then(data => {
      if(data === '成功') return
      return Promise.reject('出错')
    })
    .catch(err => {
      data.message = '标签与文章关系数据文档，保存出错'
      data.data = null
    })
  return data
}

module.exports = articleModel