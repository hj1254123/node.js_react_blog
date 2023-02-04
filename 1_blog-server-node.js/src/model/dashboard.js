const articleModel = require("./article")
const commentModel = require("./comment")
const tagsModel = require("./tags")

const dashboardModel = {}
module.exports = dashboardModel // 提升导出是为了解决循环引用问题

dashboardModel.getStatistics = function() { //获取统计信息
  // "data": {
  //   "totalArticles": 100,
  //   "totalViews": 100,
  //   "totalComments": 100,
  //   "totalTags": 100
  // }

  const data = {
    message: '',
    data: {
      totalArticles: 0,
      totalViews: 0,
      totalComments: 0,
      totalTags: 0,
    }
  }

  // 读取数据
  const articlesDB = articleModel.throwArticlesData()
  const commentsDB = commentModel.throwCommentsData()
  const tagsDB = tagsModel.throwTagsData()

  // 总文章数
  data.data.totalArticles = articlesDB.length
  // 总阅读数
  let totalViews = 0
  for (const article of articlesDB) {
    totalViews += article.views
  }
  data.data.totalViews = totalViews
  // 总评论数
  data.data.totalComments = commentsDB.length
  // 总标签数
  data.data.totalTags = tagsDB.length
  // 返回
  data.message = '成功'
  return data
}




