const fs = require("fs")
const path = require("path")
const xss = require("xss")

const tagsModel = require("./tags.js")
const tagAndArticleModel = require("./tag&article.js")

const articlesDBPath = path.resolve(__dirname, '../db/articles.json')


//添加文章接口校验数据是否合法
const addArticleVerification = (articleData) => {
  let result = { message: '校验通过', boolean: true }
  let { title, intro, content, tags } = articleData
  // 标题：不能为空、类型为string
  // 简介: 类型为string
  // 内容：不能为空、类型为string
  // 标签：必须为数组，且元素为string

  let checkTitle = !title || (typeof title !== 'string')
  let checkIntro = typeof intro !== 'string'
  let checkContent = !content || (typeof content !== 'string')
  // 长度控制
  if(title.length > 50) {
    checkTitle = true
  } else if(intro.length > 300) {
    checkIntro = true
  } else if(content.length > 30000) {
    checkContent = true
  }
  // 标签校验
  let checkTags = !Array.isArray(tags)
  // 如果tags是数组，校验标签元素
  if(!checkTags) {
    tags.forEach(item => {
      if(typeof item !== 'string') {
        checkTags = true
      } else if(item.length > 20) {
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

// 添加文章接口xss过滤
const addArticleXssFilter = (articleData) => {
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

// 修改文章接口校验是否合法
const putArticleVerification = (articleData) => {
  let result = { message: '校验通过', boolean: true }
  let { articleID, title, intro, content } = articleData

  // ID: 只能是数字
  // 标题：不能为空、类型为string
  // 简介: 类型为string
  // 内容：不能为空、类型为string

  let checkArticleID = typeof articleID !== 'number'
  let checkTitle = !title || (typeof title !== 'string')
  let checkIntro = typeof intro !== 'string'
  let checkContent = !content || (typeof content !== 'string')
  // 长度控制
  if(title.length > 50) {
    checkTitle = true
  } else if(intro.length > 300) {
    checkIntro = true
  } else if(content.length > 30000) {
    checkContent = true
  }

  if(checkArticleID || checkTitle || checkIntro || checkContent) {
    result.boolean = false
  }
  if(checkArticleID) {
    result.message = '文章id校验失败'
  } else if(checkTitle) {
    result.message = '文章标题校验失败'
  } else if(checkIntro) {
    result.message = '文章简介校验失败'
  } else if(checkContent) {
    result.message = '文章内容校验失败'
  }
  // 全部校验通过
  return result
}

// 修改文章接口xss过滤
const putArticleXssFilter = (articleData) => {
  let data = {}
  let { articleID, title, intro, content } = articleData
  data.articleID = articleID
  data.title = xss(title)
  data.intro = xss(intro)
  data.content = xss(content)
  return data
}

const articleModel = {}

articleModel.getArticlesData = () => {
  return JSON.parse(fs.readFileSync(articlesDBPath))
}

articleModel.save = (articlesData) => {
  fs.writeFileSync(articlesDBPath, JSON.stringify(articlesData))
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
articleModel.addArticle = (articleData) => {
  // 0.初始化返回给客户端的数据
  //   - message：处理结果描述；
  //   - data：文章数据（包含id、time等信息）
  const data = {
    message: '',
    data: null
  }

  // 1.文章校验
  let result = addArticleVerification(articleData)

  // 如校验失败直接返回信息
  if(!result.boolean) {
    data.message = result.message
    return data
  }

  // 2.文章数据安全处理
  let { title, intro, content, tags } = addArticleXssFilter(articleData)

  // 3.保存新文章
  let newArticleData = articleModel.saveNewArticle(title, intro, content)

  // data.data 是最终返回给客户端的数据，包含了文章处理后的信息（文章id、time...）
  data.data = { ...newArticleData }

  // 4.保存标签数据
  try {
    let tagsArr = tagsModel.addTags(tags)
    data.data.tags = tagsArr
  } catch(error) {
    data.message = '标签保存出错，请手动删除新添加数据。'
    data.data = null
    return data
  }

  // 5.保存标签与文章关系数据文档
  const articleID = data.data.id
  const tagsIDArr = []
  for(const item of data.data.tags) {
    tagsIDArr.push(item.id)
  }

  try {
    tagAndArticleModel.addTagArticle(articleID, tagsIDArr)
  } catch(error) {
    data.message = '标签与文章关系文档保存出错，请手动删除新添加数据。'
  }

  data.message = '文章添加成功'
  return data
}

articleModel.delArticle = (articleID) => {
  // 初始化待返回给客户端的数据
  const data = {
    message: "",
    data: {
      articleID: articleID
    }
  }
  // 1.删除文章
  // - 数据校验
  if(typeof articleID !== 'number') {
    data.message = '文章ID只能为数字'
    return data
  }
  // - 读取文章数据
  const articlesDB = articleModel.getArticlesData()
  // - 遍历找到文章并删除
  // 找到文章下标
  const result = articlesDB.findIndex(item => {
    return item.id === articleID
  })
  // 没找到返回结果
  if(result === -1) {
    data.message = '没有该文章'
    return data
  }
  // 删除文章
  articlesDB.splice(result, 1)
  // - 保存文章数据
  articleModel.save(articlesDB)

  // 2.删除文章与标签关系文档对应的数据
  tagAndArticleModel.filterByArticleID(articleID)

  data.message = '删除文章成功'
  return data
}

articleModel.putArticle = (articleData) => {
  console.log('first', articleData)
  // 初始化待返回给客户端的数据
  const data = {
    message: '',
    data: {}
  }
  // 1.校验数据
  const result = putArticleVerification(articleData)
  // 如校验失败直接返回信息
  if(!result.boolean) {
    data.message = result.message
    return data
  }

  // 2.安全过滤
  const { articleID, title, intro, content } = putArticleXssFilter(articleData)
  // 3.检查是否存在该文章
  const articleDB = articleModel.getArticlesData()
  const index = articleDB.findIndex((item) => {
    return item.id === articleID
  })
  // 没有该文章直接返回
  if(index === -1) {
    data.message = '没有该文章'
    return data
  }

  // 4.修改并保存
  articleDB[index].title = title
  articleDB[index].intro = intro
  articleDB[index].content = content
  articleModel.save(articleDB)
  // 5.返回结果
  data.message = '文章修改成功'
  data.data = {...articleDB[index]}
  return data
}

module.exports = articleModel