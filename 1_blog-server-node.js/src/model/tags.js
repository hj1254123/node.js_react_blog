const fs = require('fs')
const path = require('path')
const xss = require('xss')

const tagsModel = {}
module.exports = tagsModel // 提升导出是为了解决循环引用问题

const tagAndArticleModel = require("./tag&article.js")
const articleModel = require('./article.js')

const tagsDBPath = path.resolve(__dirname, '../db/tags.json')

// 根据标签数组，添加标签，并返回添加后的标签数据
// 参数 tagsArr 在 ./article.js 中已校验和安全处理
tagsModel.addTagsFromArticleInterface = function(tagsArr) {
  // 待返回的数据
  let tagsArrReturned = null
  const tagsDBData = getTagsData()

  tagsArrReturned = tagsArr.map(item => {
    // - 检查标签是否已经存在
    for(const i of tagsDBData) {
      if(item === i.tagName) {
        // 存在直接返回，不再保存
        return i
      }
    }
    // - 添加待保存标签
    let newTagData = {}
    // 计算唯一ID
    let lastItem = tagsDBData[tagsDBData.length - 1]
    if(lastItem === undefined) {
      newTagData.id = 1
    } else {
      newTagData.id = lastItem.id + 1
    }

    newTagData.tagName = item
    newTagData.time = new Date().getTime()
    tagsDBData.push(newTagData)
    return newTagData
  })

  // 保存标签数据文档
  save(tagsDBData)
  // 返回已保存的标签信息
  return tagsArrReturned
}

// 根据标签ID数组，返回对应的标签信息数组
tagsModel.returnItemsBasedOnTheTagsIDArr = function(tagsIDArr) {
  // 初始化待返回的数组
  const tagsArr = []
  const tagsDB = getTagsData()
  for(const id of tagsIDArr) {
    for(const item of tagsDB) {
      if(id === item.id) {
        tagsArr.push(item)
        break
      }
    }
  }
  return tagsArr
}

// 根据文章id追加一个标签
tagsModel.additionalTag = function(articleID, tagName) {
  // - 初始化待返回的数据
  const data = {
    message: '',
    data: {
      articleID,
      tags: []
    }
  }

  // - 校验数据
  if(typeof articleID !== 'number') {
    data.message = '文章ID必须是数字'
    return data
  } else if((typeof tagName !== 'string') || tagName.length > 20) {
    data.message = '标签名必须是字符串，且长度20'
    return data
  }
  // - 检查文章id是否存在
  let s = articleModel.checkIfTheArticleExists(articleID)
  if(s.boolean === false) {
    data.message = '文章不存在，操作取消'
    return data
  }
  // - 标签名xss过滤
  const cleanTagName = xss(tagName)

  // - 添加标签，并写入数据文档
  // 拿到标签文档数据
  const tagsDBData = getTagsData()
  // 检查标签是否已经存在
  const index = tagsDBData.findIndex(item => item.tagName === cleanTagName)
  const newTagID = [] //待添加的标签ID
  if(index == -1) { //不存在则增加新标签
    // 待保存标签
    let newTagData = {}
    // 计算唯一ID
    let lastItem = tagsDBData[tagsDBData.length - 1]
    if(lastItem === undefined) {
      newTagData.id = 1
    } else {
      newTagData.id = lastItem.id + 1
    }

    newTagData.tagName = cleanTagName
    newTagData.time = new Date().getTime()
    tagsDBData.push(newTagData)
    // 保存标签数据文档
    save(tagsDBData)
    newTagID.push(newTagData.id)
  } else {
    newTagID.push(tagsDBData[index].id)
  }
  // - 添加关系链接
  try {
    const r = tagAndArticleModel.addTagArticle(articleID, newTagID)
    if(r !== '成功') {
      throw '出错'
    }
  } catch(error) {
    data.message = '标签与文章关系文档保存出错，请手动删除新添加数据。'
    return data
  }

  // - 拿到该文章对应的标签数据
  // 根据文章id拿到所有标签id
  const arr = tagAndArticleModel.returnItemsBasedOnTheArticleID(articleID)
  const tagIDArr = []
  for(const item of arr) {
    tagIDArr.push(item.tagID)
  }
  // 根据标签id数组拿到所有标签数据
  const tags = tagsModel.returnItemsBasedOnTheTagsIDArr(tagIDArr)
  // - 添加标签数据，返回结果
  data.data.tags = tags
  data.message = '追加标签成功'
  return data
}

// 删除一个标签
tagsModel.delTag = function(tagID) {
  // 待返回数据
  const data = {
    message: '',
    data: {
      tag: {}
    }
  }
  // 校验数据
  if(typeof tagID !== 'number') {
    data.message = '标签ID必须为数字'
    return data
  }

  const tagsDB = getTagsData()
  const index = tagsDB.findIndex(item => {
    return item.id === tagID
  })
  if(index === -1) {
    data.message = '没有该标签'
    return data
  }
  data.data.tag = tagsDB[index]
  // 删除该项
  tagsDB.splice(index, 1)
  // 覆盖
  save(tagsDB)
  // 返回
  data.message = '删除该标签成功'
  return data
}

// 批量删除标签
tagsModel.delTags = function(tagsIDArr) {
  // 待返回数据
  const data = {
    message: '',
    data: {
      tag: []
    }
  }
  // 校验数据
  if(!Array.isArray(tagsIDArr)) {
    data.message = 'tagsIDArr必须为数组'
    return data
  }

  for(const tagID of tagsIDArr) {
    if(typeof tagID !== 'number') {
      data.message = '标签ID必须为数字'
      return data
    }
  }

  let tagsDB = getTagsData()
  // 只要有一个标签id没有找到，就返回失败
  for(const tagID of tagsIDArr) {
    const index = tagsDB.findIndex(item => {
      return item.id === tagID
    })
    if(index === -1) {
      data.message = `没有ID为${tagID}的标签，操作取消`
      return data
    } else {
      data.data.tag.push(tagsDB[index])
    }
  }
  // 批量删除
  for(const tagID of tagsIDArr) {
    tagsDB = tagsDB.filter(item => {
      return item.id !== tagID
    })
  }
  // 覆盖
  save(tagsDB)
  // 返回
  data.message = '批量删除标签成功'
  return data
}

// 修改一个标签名
tagsModel.putTagName = function(tagID, tagName) {
  // 初始化待返回数据
  const data = {
    message: '',
    data: { tag: null }
  }
  const tagsDB = getTagsData()
  const i = tagsDB.findIndex(item => {
    return item.id === tagID
  })
  if(i === -1) {
    data.message = '没有该标签'
  }
  tagsDB[i].tagName = tagName
  save(tagsDB)
  data.message = '修改标签名称成功'
  data.data.tag = tagsDB[i]
  return data
}

// 根据文章id返回标签信息数组
tagsModel.getTagsArrBasedOnTheArticleID = function(articleID) {
  const arr = tagAndArticleModel.returnItemsBasedOnTheArticleID(articleID)
  const tagIDArr = []
  for(const item of arr) {
    tagIDArr.push(item.tagID)
  }
  // 根据标签id数组拿到所有标签数据
  const tags = tagsModel.returnItemsBasedOnTheTagsIDArr(tagIDArr)
  return tags
}

// 获取所有标签
tagsModel.getTagsArr = function() {
  return getTagsData()
}

// 向外抛出标签数据
tagsModel.throwTagsData = function() {
  return getTagsData()
}

// 以下是一些工具函数

function getTagsData() {
  return JSON.parse(fs.readFileSync(tagsDBPath))
}

function save(tagDBData) {
  fs.writeFileSync(tagsDBPath, JSON.stringify(tagDBData))
}

