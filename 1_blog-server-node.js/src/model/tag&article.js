const fs = require("fs")
const path = require("path")

const tagAndArticleModel = {}
module.exports = tagAndArticleModel

const tag_articleDBPath = path.resolve(__dirname, '../db/tag&article.json')

// 根据文章ID和标签ID数组，添加关联项
tagAndArticleModel.addTagArticle = function(articleID, tagsIDArr) {
  const tagArticleDB = getTagArticleData()

  for(const tagID of tagsIDArr) {
    // 0.标签ID不是数字报错
    if(typeof tagID !== 'number') {
      return '标签名不是数字'
    }
    // 1.检查重复项
    let isRepeat = false
    for(const item of tagArticleDB) {
      if((tagID === item.tagID) && (articleID === item.articleID)) {
        isRepeat = true
        break
      }
    }
    // 如果重复结束本次循环
    if(isRepeat) continue

    // 2.添加一项数据
    // 初始化
    const tagArticleItem = {
      id: 1,
      articleID: articleID,
      tagID: tagID,
      time: 0
    }
    // 计算唯一ID
    let lastItem = tagArticleDB[tagArticleDB.length - 1]
    if(lastItem === undefined) {
      tagArticleItem.id = 1
    } else {
      tagArticleItem.id = lastItem.id + 1
    }
    // 创建时间
    tagArticleItem.time = new Date().getTime()
    // 添加
    tagArticleDB.push(tagArticleItem)
    // 保存
    save(tagArticleDB)
  }
  return '成功'
}

// 过滤掉包含给定articleID的项，并覆盖保存数据文档。
tagAndArticleModel.delItemsBasedOnTheArticleID = function(articleID) {
  const tagArticleDB = getTagArticleData()

  const newArr = tagArticleDB.filter(item => {
    return item.articleID !== articleID
  })

  save(newArr)

  return true
}

// 过滤掉包含给定tagID的项，并覆盖保存数据文档。
tagAndArticleModel.delItemsBasedOnTheTagID = function(tagID) {
  const tagArticleDB = getTagArticleData()

  const newArr = tagArticleDB.filter(item => {
    return item.tagID !== tagID
  })

  save(newArr)

  return true
}

// 过滤掉包含给定tagsIDArr的项，并覆盖保存数据文档。
tagAndArticleModel.delItemsBasedOnTheTagsIDArr = function(tagsIDArr) {
  const tagArticleDB = getTagArticleData()

  const newArr = tagArticleDB.filter(item => {
    let result = true
    // 包含任一 tagID 就过滤
    for (const tagID of tagsIDArr) {
      result = (item.tagID !== tagID)
      if(result === false) {
        // 找到了过滤该项
        return result
      }
    }
    // 没找到保存该项
    return result
  })

  save(newArr)

  return true
}

// 根据文章ID返回所有包含该ID的项（数组）
tagAndArticleModel.returnItemsBasedOnTheArticleID = function(articleID) {
  const tagArticleDB = getTagArticleData()

  const newArr = tagArticleDB.filter(item => {
    return item.articleID === articleID
  })
  
  return newArr
}

// 删除某篇文章的单个标签
tagAndArticleModel.removeTagFromArticle = function(articleID, tagID) {
  // 待返回数据
  const data = {
    message: '',
    data: null
  }
  // 校验数据
  if((typeof articleID !== 'number') || typeof tagID !== 'number') {
    data.message = '文章或标签id不为数字'
    return data
  }
  // 检查是否存在
  const tagArticleDB = getTagArticleData()
  const index = tagArticleDB.findIndex((item) => {
    return (item.articleID === articleID) && (item.tagID === tagID)
  })
  if(index === -1) {
    data.message = '没有该关系项'
    return data
  }
  // 删除该项，并保存 
  tagArticleDB.splice(index, 1)
  save(tagArticleDB)
  // 返回
  data.message = '删除该文章标签成功'
  data.data = {articleID, tagID}
  return data
}

// 根据标签id获取文章id数组 
tagAndArticleModel.getArticleIDArrBasedOnTagID = function(tagID) {
  // 待返回数据
  const data = []
  const tagArticleDB = getTagArticleData()
  const items = tagArticleDB.filter(item => {
    return item.tagID === tagID
  })
  for (const item of items) {
    data.push(item.articleID)
  }
  return data
}

// 下方是一些工具方法

function getTagArticleData() {
  return JSON.parse(fs.readFileSync(tag_articleDBPath))
}

function save(data) {
  fs.writeFileSync(tag_articleDBPath, JSON.stringify(data))
}

