const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const userController = require('../model/user')

const { PRIVATE_KEY, PUBLIC_KEY } = require('../constants/config')

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
        const token = jwt.sign(data.data, PRIVATE_KEY, {
          expiresIn: 60 * 60 * 24 * 2, //2天过期
          algorithm: 'RS256',// 设置算法为 RS256
          issuer: 'Monkey'
        })
        data.data.token = token
        res.json(data)
      } else {
        // 登录失败
        res.json(data)
      }
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router
