const articleModel = require("./article")
const commentModel = require("./comment")
const tagsModel = require("./tags")

const dashboardModel = {}
module.exports = dashboardModel // 提升导出是为了解决循环引用问题

dashboardModel.getBasicInformation = function() { //获取统计信息
  const data = {
    totalArticles: 0,
    totalViews: 0,
    totalComments: 0,
    totalTags: 0,
  }

  // 读取数据
  const articlesDB = articleModel.throwArticlesData()
  const commentsDB = commentModel.throwCommentsData()
  const tagsDB = tagsModel.throwTagsData()

  // 总文章数
  data.totalArticles = articlesDB.length
  // 总阅读数
  let totalViews = 0
  for(const article of articlesDB) {
    totalViews += article.views
  }
  data.totalViews = totalViews
  // 总评论数
  data.totalComments = commentsDB.length
  // 总标签数
  data.totalTags = tagsDB.length
  // 返回
  return data
}




