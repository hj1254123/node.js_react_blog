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

/**
 * @description 校验文章数据是否合法
 * @param {object} articleData 文章数据对象 
 * @returns {object} 返回对象包含两个属性。message:校验结果信息；boolean:true校验通过，false校验失败。
 */
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

/**
 * @description 文章数据安全(xss)
 * @param {object} articleData 文章数据
 * @returns {object} 返回一个干净的文章数据对象
 */
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

articleModel.saveNewArticle = (title, intro, content) => {
  // 待保存的新文章
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
  // 文章创建时间
  newArticleData.time = new Date().getTime()
  // push并保存文章数据
  articlesDB.push(newArticleData)
  articleModel.save(articlesDB)

  return newArticleData
}

/**
 * 添加一篇文章
 * - 保存文章数据、返回处理后的数据
 * - 保存标签数据、返回处理后的数据
 * - 根据文章、标签两者id，保存关系文档数据，并返回数据
 * - 最后合并文章、标签数据，返回给客户端
 */
articleModel.addArticle = async (articleData) => {
  // 0.初始化返回给客户端的数据
  //   - message：处理结果描述；
  //   - data：文章数据（包含id、time等信息）
  const data = {
    message: '',
    data: null
  }

  // 1.文章校验
  let result = articleModel.articleVerification(articleData)

  // 如校验失败直接返回信息
  if(!result.boolean) {
    data.message = result.message
    return data
  }

  // 2.文章数据安全处理
  let { title, intro, content, tags } = articleModel.articleSecurityHandling(articleData)

  // 3.保存新文章，并返回的数据（包含文章id、时间等）
  let newArticleData = articleModel.saveNewArticle(title, intro, content)

  // data.data 最终返回给客户端的数据，包含了文章处理后的信息（文章id、time...）
  data.data = { ...newArticleData }

  // 4.保存标签数据
  try {
    let tagsArr = tagsModel.addTags(tags)
    data.data.tags = tagsArr
  } catch(error) {
    data.message = '标签保存出错。请手动清理新添加的文章，或通过后台添加标签。'
    data.data = null
    return data
  }

  // 5.保存标签与文章关系数据文档
  tagAndArticleModel.addTagArticle(data.data.id, data.data.tags)

  return data
}

module.exports = articleModel