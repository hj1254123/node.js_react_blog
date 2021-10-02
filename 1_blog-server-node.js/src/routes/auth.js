const express = require('express')
const router = express.Router()

const userController = require('../model/user')

router.post('/register', (req, res, next) => {
  // - 拿到用户数据
  const userName = req.body.userName
  const password = req.body.password
  const invitationCode = req.body.invitation_code //邀请码，暂不开放注册功能
  // - 初始化待返回给客户端数据
  let data = null
  let error = null
  // - 创建用户
  userController.createUser(userName, password, invitationCode, (err, userData) => {
    error = err
    data = userData
  })
  // - 失败/成功结果返回给客户端
  if(error) {
    next(error)
  } else {
    res.json(data)
  }
})

router.post('/login', (req, res) => {
  res.json('登录接口')
})

module.exports = router
