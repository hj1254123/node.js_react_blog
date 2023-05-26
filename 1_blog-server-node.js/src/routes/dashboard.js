const express = require('express')
const dashboardModel = require('../model/dashboard')
const cacheMiddleware = require('../middleware/cache')
const logger = require('../utils/logger')

const router = express.Router()

router.get('/basic_statistics', cacheMiddleware(2), (req, res) => {
  try {
    const data = dashboardModel.getBasicStatistics()
    res.json(data)
  } catch(error) {
    logger.error(error)
    res.status(500).json('basic_statistics接口出错')
  }
})

router.get('/annual_article_statistics/:year', cacheMiddleware(2), (req, res) => {
  try {
    let data = null
    const year = req.params.year
    if(year === 'recent') { //最近一年的
      data = dashboardModel.getRecentArticleStatistics()
    } else {
      data = dashboardModel.getAnnualArticleStatistics(year)
    }
    res.json(data)
  } catch(error) {
    logger.error(error)
    res.status(500).json('annual_article_statistics接口出错')
  }
})

module.exports = router

