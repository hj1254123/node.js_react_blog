const fs = require("fs")
const path = require("path")

const tag_articleDBPath = path.resolve(__dirname, '../db/tag&article.json')


const tagAndArticleModel = {}

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

// 过滤掉包含给定文章id的项，并覆盖保存数据文档。
tagAndArticleModel.delItemsBasedOnTheArticleID = function(articleID) {
  const tagArticleDB = getTagArticleData()

  const newArr = tagArticleDB.filter(item => {
    return item.articleID !== articleID
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


// 下方是一些工具方法

function getTagArticleData() {
  return JSON.parse(fs.readFileSync(tag_articleDBPath))
}

function save(data) {
  fs.writeFileSync(tag_articleDBPath, JSON.stringify(data))
}


module.exports = tagAndArticleModel