const fs = require('fs')
const path = require('path')
const xss = require('xss')

const tagAndArticleModel = require("./tag&article.js")

const tagsDBPath = path.resolve(__dirname, '../db/tags.json')


const tagsModel = {}

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

  // - 标签名xss过滤
  const cleanTagName = xss(tagName)

  // - 添加标签，并写入数据文档
  // 拿到标签文档数据
  const tagsDBData = getTagsData()
  // 检查标签是否已经存在
  for(const i of tagsDBData) {
    if(cleanTagName === i.tagName) {
      // 存在直接返回，不再保存
      data.message = '该标签已存在'
      return data
    }
  }
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

  // - 添加关系链接
  try {
    const r = tagAndArticleModel.addTagArticle(articleID, [newTagData.id])
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
  console.log('first', tagsDB);
  const index = tagsDB.findIndex(item => {
    return item.id === tagID
  })
  console.log('---', index, tagsDB);
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

// 以下是一些工具函数

function getTagsData() {
  return JSON.parse(fs.readFileSync(tagsDBPath))
}

function save(tagDBData) {
  fs.writeFileSync(tagsDBPath, JSON.stringify(tagDBData))
}

module.exports = tagsModel