const express = require('express')
const dashboardModel = require('../model/dashboard')
const cacheMiddleware = require('../middleware/cache')

const router = express.Router()

router.get('/statistics', cacheMiddleware(10), (req, res) => {
  try {
    const data = {
      message: '成功'
    }
    const r1 = dashboardModel.getBasicInformation()
    data.basicInformation = r1
    console.log(data)
    res.json(data)
  } catch(error) {
    console.log('dashboard/statistics接口出错', error)
    res.status(500).json('dashboard/statistics接口出错')
  }
})

module.exports = router

