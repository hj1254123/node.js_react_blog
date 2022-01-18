const fs = require("fs")
const path = require("path")

const tag_articleDBPath = path.resolve(__dirname, '../db/tag&article.json')

const tagAndArticle = {}

tagAndArticle.getTagArticleData = () => {
  return JSON.parse(fs.readFileSync(tag_articleDBPath))
}

tagAndArticle.save = (data) => {
  fs.writeFileSync(tag_articleDBPath, JSON.stringify(data))
}

tagAndArticle.addTagArticle = (articleID, tagsIDArr) => {
  const tagArticleDBData = tagAndArticle.getTagArticleData()

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
    tagAndArticle.save(tagArticleDBData)
  }
  return '成功'
}

module.exports = tagAndArticle