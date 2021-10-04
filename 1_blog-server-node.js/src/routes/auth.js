const express = require('express')
const router = express.Router()

const userController = require('../model/user')

router.post('/register', (req, res, next) => {
  // // - 拿到用户数据
  let { userName, password, invitationCode } = req.body
  // - 创建用户
  userController
    .createUser(userName, password, invitationCode)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      next(err)
    })
})

router.post('/login', (req, res, next) => {
  // 拿到 用户名、密码
  let { userName, password } = req.body

  // 根据用户名、密码，验证登录
  userController
    .userNamePasswordAuth(userName, password)
    .then(data => {
      if(data.message === '登录成功') {
        // 颁发token
        
      }
      // 向客户端返回结果
      res.json(data)
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router
