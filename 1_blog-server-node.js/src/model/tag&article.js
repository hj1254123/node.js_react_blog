const fs = require("fs")
const path = require("path")

const tag_articleDBPath = path.resolve(__dirname, '../db/tag&article.json')

const tagAndArticleModel = {}

tagAndArticleModel.getTagArticleData = () => {
  return JSON.parse(fs.readFileSync(tag_articleDBPath))
}

tagAndArticleModel.save = (data) => {
  fs.writeFileSync(tag_articleDBPath, JSON.stringify(data))
}

tagAndArticleModel.addTagArticle = (articleID, tagsIDArr) => {
  const tagArticleDBData = tagAndArticleModel.getTagArticleData()

  for(const tagID of tagsIDArr) {
    // 1.检查重复项
    let isRepeat = false
    for(const item of tagArticleDBData) {
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
    let lastItem = tagArticleDBData[tagArticleDBData.length - 1]
    if(lastItem === undefined) {
      tagArticleItem.id = 1
    } else {
      tagArticleItem.id = lastItem.id + 1
    }
    // 创建时间
    tagArticleItem.time = new Date().getTime()
    // 添加
    tagArticleDBData.push(tagArticleItem)
    // 保存
    tagAndArticleModel.save(tagArticleDBData)
  }
  return '成功'
}

// 过滤掉包含给定文章id的项，并覆盖保存数据文档。
tagAndArticleModel.filterByArticleID = (articleID) => {
  const tagArticleDBData = tagAndArticleModel.getTagArticleData()
  
  const newArr = tagArticleDBData.filter(item => {
    return item.articleID !== articleID
  })

  tagAndArticleModel.save(newArr)

  return true
}
module.exports = tagAndArticleModel