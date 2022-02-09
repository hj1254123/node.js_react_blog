const express = require('express')
const archiveModel = require('../model/archive')
const router = express.Router()

router.get('/:page', (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page)
    const data = archiveModel.getPage(pageNumber)
    res.json(data)
  } catch (error) {
    console.log(error);
    res.status(500).json('获取归档文章列表出错，注意处理')
  }
})

module.exports = router