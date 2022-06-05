const fs = require("fs")
const path = require("path")
const xss = require("xss")

const tagsModel = require("./tags.js")
const tagAndArticleModel = require("./tag&article.js")

const articlesDBPath = path.resolve(__dirname, '../db/articles.json')


const articleModel = {}

articleModel.addArticle = function(articleData) {
  /**
   * 添加一篇文章
   * - 保存文章数据、返回处理后的数据
   * - 保存标签数据、返回处理后的数据
   * - 根据文章、标签两者id，保存关系文档数据，并返回数据
   * - 最后合并文章、标签数据，返回给客户端
   */

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

  // 2.这里关于xss防御，交给前端处理更合适。
  let { title, intro, content, tags } = articleData

  // 3.保存新文章
  let newArticleData = saveNewArticle(title, intro, content)

  // data.data 是最终返回给客户端的数据，包含了文章处理后的信息（文章id、time...）
  data.data = { ...newArticleData }

  // 4.保存标签数据
  try {
    let tagsArr = tagsModel.addTagsFromArticleInterface(tags)
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

articleModel.delArticle = function(articleID) {
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
  const articlesDB = getArticlesData()
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
  save(articlesDB)

  // 2.根据文章id删除文章与标签关系文档中对应的数据
  tagAndArticleModel.delItemsBasedOnTheArticleID(articleID)

  data.message = '删除文章成功'
  return data
}

articleModel.putArticle = function(articleData) {
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

  // 2.这里关于xss防御，交给前端处理更合适。
  const { articleID, title, intro, content } = articleData

  // 3.检查是否存在该文章
  const articlesDB = getArticlesData()
  const index = articlesDB.findIndex((item) => {
    return item.id === articleID
  })
  // 没有该文章直接返回
  if(index === -1) {
    data.message = '没有该文章'
    return data
  }

  // 4.修改并保存
  articlesDB[index].title = title
  articlesDB[index].intro = intro
  articlesDB[index].content = content
  save(articlesDB)
  // 5.返回结果
  data.message = '文章修改成功'
  data.data = { ...articlesDB[index] }
  return data
}

articleModel.getArticle = function(articleID) {
  // 初始化待返回给客户端的数据
  const data = {
    message: '',
    data: {}
  }
  const articlesDB = getArticlesData()
  const index = articlesDB.findIndex(item => {
    return item.id === articleID
  })
  // 1.文章数据处理
  if(index === -1) {
    // 没找到直接返回
    data.message = '没有该文章'
    return data
  }
  // 文章数据
  data.data = articlesDB[index]
  // nav数据（上/下 一篇文章）
  let prev = articlesDB[index - 1]
  let next = articlesDB[index + 1]
  let prevID = -1 // 默认-1，表示没有该文章
  let nextID = -1

  if(prev) { // 有文章才添加id
    prevID = prev.id
  }
  if(next) {
    nextID = next.id
  }

  data.data.nav = {
    prevID,
    nextID
  }

  // 2.拿到对应的标签数据
  const tags = tagsModel.getTagsArrBasedOnTheArticleID(articleID)
  // 添加标签数据
  data.data.tags = tags
  data.message = '成功'
  
  // 返回
  return data
}

// 获取某页文章列表（10篇/页）
articleModel.getPage = function(pageN) {
  // 待返回的数据
  const data = {
    message: '',
    data: []
  }
  // 计算截取范围
  const size = 10 // 10篇/页
  const start = (pageN - 1) * size
  const end = start + size
  // 获取文章数据
  const articlesDB = getArticlesData().reverse() //倒序
  // 总共多少页
  const total = Math.ceil(articlesDB.length / size)
  // 切割下需要的文章
  const cutArticleArr = articlesDB.slice(start, end)

  // 给每一篇文章添加对应的标签数据
  for(const item of cutArticleArr) {
    // 根据文章id拿到所有标签id
    const tags = tagsModel.getTagsArrBasedOnTheArticleID(item.id)
    // 给文章添加标签数据
    item.tags = tags
  }
  // 返回
  data.message = '获取文章列表成功'
  data.total = total
  data.data = cutArticleArr
  return data
}

// 根据文章id检查是否存在对应的文章
articleModel.checkIfTheArticleExists = function(articleID) {
  // 默认存在
  const data = {
    message: '存在该文章',
    boolean: true
  }
  const articlesDB = getArticlesData()

  const index = articlesDB.findIndex(item => {
    return item.id === articleID
  })

  if(index === -1) {
    data.message = '没有该文章'
    data.boolean = false
  }

  return data
}

// 供其他模块获取文章数据文档
articleModel.throwArticlesData = function() {
  return getArticlesData()
}

// 获取文章数据数组，基于文章id数组

articleModel.getArticleArrBasedOnTheArticleIDArr = function(articleIDArr) {
  // 待返回数据
  const data = []
  const articlesDB = getArticlesData()
  for(const articleID of articleIDArr) {
    const a = articlesDB.find(item => {
      return item.id === articleID
    })
    data.push(a)
  }
  return data
}

/**
 * 下方是一些工具函数
 */

// 读取并返回文章数据文档
function getArticlesData() {
  return JSON.parse(fs.readFileSync(articlesDBPath))
}

// 保存文章数据文档
function save(articlesData) {
  fs.writeFileSync(articlesDBPath, JSON.stringify(articlesData))
}

// 保存一篇新文章
function saveNewArticle(title, intro, content) {
  // 待保存的新文章
  const newArticleData = {
    id: 1,
    time: 1,
    title: title,
    intro: intro,
    content: content
  }

  // 查询数据库，读取文章数据
  let articlesDB = getArticlesData()
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
  save(articlesDB)

  return newArticleData
}

//添加文章接口校验数据是否合法
function addArticleVerification(articleData) {
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
  if(title.length > 60) {
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


// 修改文章接口校验是否合法
function putArticleVerification(articleData) {
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
  if(title.length > 60) {
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


module.exports = articleModel