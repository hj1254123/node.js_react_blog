const express = require('express')
const dashboardModel = require('../model/dashboard')
const cacheMiddleware = require('../middleware/cache')

const router = express.Router()

router.get('/basic_statistics', cacheMiddleware(10), (req, res) => {
  try {
    const data = dashboardModel.getBasicStatistics()
    res.json(data)
  } catch(error) {
    console.log('basic_statistics接口出错', error)
    res.status(500).json('basic_statistics接口出错')
  }
})

module.exports = router

