const express = require('express')
const dashboardModel = require('../model/dashboard')
const cacheMiddleware = require('../middleware/cache')

const router = express.Router()

router.get('/statistics', cacheMiddleware(10), (req, res) => {
  const result = dashboardModel.getStatistics()
  res.json(result)
})

module.exports = router

