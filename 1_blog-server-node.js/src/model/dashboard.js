const dayjs = require("dayjs")

const articleModel = require("./article")
const commentModel = require("./comment")
const tagsModel = require("./tags")

const dashboardModel = {}
module.exports = dashboardModel // 提升导出是为了解决循环引用问题

dashboardModel.getBasicStatistics = function() { //获取统计信息
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
  for(const article of articlesDB) {
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

dashboardModel.getAnnualArticleStatistics = function(year) {
  const data = {
    message: '',
    data: {}
  }
  const startTime = Date.parse(+year + '-01-01 00:00:00 +8')
  const endTime = Date.parse(+year + 1 + '-01-01 00:00:00 +8')
  data.data = getTheArticleStatisticsForACertainPeriodOfTime(startTime, endTime)
  data.message = '成功'
  return data
}

dashboardModel.getRecentArticleStatistics = function() {
  const data = {
    message: '',
    data: {}
  }
  const endTime = Date.now()
  const startTime = endTime - (60 * 60 * 24 * 365 * 1000)
  data.data = getTheArticleStatisticsForACertainPeriodOfTime(startTime, endTime)
  data.message = '成功'
  return data
}

// 传入开始、结束日期时间搓
// 返回该时间段内的文章统计数据（日期：发布文章数）
function getTheArticleStatisticsForACertainPeriodOfTime(startTime, endTime) {
  const obj = {}
  // 读取文章数据
  const articlesDB = articleModel.throwArticlesData()

  articlesDB.forEach(item => {
    if(item.time >= startTime && item.time < endTime) {
      const day = dayjs(item.time).format('YYYY-MM-DD')
      if(obj.hasOwnProperty(day)) {
        obj[day] += 1
      } else {
        obj[day] = 1
      }
    }
  })
  return obj
}


