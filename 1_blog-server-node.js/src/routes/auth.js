const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const authModel = require('../model/auth')

const { PRIVATE_KEY, PUBLIC_KEY } = require('../constants/config')

router.post('/register', (req, res, next) => {
  // // - 临时关闭注册接口
  // return res.json('注册接口已关闭！')
  // // - 拿到用户数据
  let { userName, password, invitationCode } = req.body
  // - 创建用户
  authModel
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
  const { userName, password } = req.body
  const ip = req.ip
  // 根据用户名、密码，验证登录
  authModel
    .userNamePasswordAuth(userName, password, ip)
    .then(data => {
      if(data.message === '登录成功') {
        // 颁发token
        const token = jwt.sign(data.data, PRIVATE_KEY, {
          expiresIn: 60 * 60 * 24, // 1天过期
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
