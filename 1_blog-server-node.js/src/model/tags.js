const fs = require('fs')
const path = require('path')

const tagsDBPath = path.resolve(__dirname, '../db/tags.json')

const tagsModel = {}

tagsModel.getTagsData = () => {
  return JSON.parse(fs.readFileSync(tagsDBPath))
}

tagsModel.save = (tagDBData) => {
  fs.writeFileSync(tagsDBPath, JSON.stringify(tagDBData))
}
// 参数 tagsArr 在 ./article.js 中已校验和安全处理
tagsModel.addTags = async (tagsArr) => {
  // tagsArrReturned 期望返回格式：[{id: 1, tagName: '测试'}]
  let tagsArrReturned
  const tagsDBData = tagsModel.getTagsData()

  tagsArrReturned = tagsArr.map(item => {
    // - 检查标签是否已经存在
    for (const i of tagsDBData) {
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

  // 保存
  tagsModel.save(tagsDBData)
  return tagsArrReturned
}

module.exports = tagsModel