const fs = require('fs')
const path = require('path')

const tagsDBPath = path.resolve(__dirname, '../db/tags.json')


const tagsModel = {
  tagsDB: getTagsData()
}

// 参数 tagsArr 在 ./article.js 中已校验和安全处理
tagsModel.addTags = function(tagsArr) {
  // tagsArrReturned 期望返回格式：[{id: 1, tagName: '测试'}]
  let tagsArrReturned
  const tagsDBData = this.tagsDB
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
  const tagsDB = this.tagsDB
  for (const id of tagsIDArr) {
    console.log('1',id);
    for (const item of tagsDB) {
      console.log('2', item);
      if(id === item.id) {
        tagsArr.push(item)
        break
      }
    }
  }
  return tagsArr
}

// 以下是一些工具函数

function getTagsData() {
  return JSON.parse(fs.readFileSync(tagsDBPath))
}

function save(tagDBData) {
  fs.writeFileSync(tagsDBPath, JSON.stringify(tagDBData))
}

module.exports = tagsModel