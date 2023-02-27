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
    data: {} // 格式{'2023-01-01': 1}，1代表当天发布的文章数
  }

  // 读取文章数据
  const articlesDB = articleModel.throwArticlesData()
  // 计算当前年的数据，格式[['2023-01-01', 0], ['2023-01-02', 2], ...],元素2为当天发布了几篇文章。
  const startTime = Date.parse(year + '-01-01 00:00:00 +8')
  const endTime = Date.parse(year + 1 + '-01-01 00:00:00 +8')

  articlesDB.forEach((item, index) => {
    if(item.time >= startTime && item.time < endTime) {
      const day = dayjs(item.time).format('YYYY-MM-DD')
      if(day in data.data) {
        data.data[day] += 1
      } else {
        data.data[day] = 1
      }
    }
  })
  // 返回
  data.message = '成功'
  return data
}



