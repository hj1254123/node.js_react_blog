const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const authModel = require('../model/auth')
const logger = require('../utils/logger')

const { PRIVATE_KEY, PUBLIC_KEY } = require('../constants/config')

router.post('/register', (req, res) => {
  try {
    // // - 临时关闭注册接口
    // return res.json('注册接口已关闭！')
    // // - 拿到用户数据
    let { userName, password, invitationCode } = req.body
    const ip = req.ip
    // - 创建用户
    const data = authModel.register(userName, password, invitationCode, ip)
    if(data.message === '注册成功') {
      // 颁发token
      data.data.token = issueToken(data.data)
    }
    res.json(data)
  } catch(error) {
    logger.error(error)
    res.status(500).json('注册用户出错')
  }
})

router.post('/login', (req, res) => {
  try {
    // 拿到 用户名、密码
    const { userName, password } = req.body
    const ip = req.ip
    // 根据用户名、密码，验证登录
    const data = authModel.login(userName, password, ip)
    if(data.message === '登录成功') {
      // 颁发token
      data.data.token = issueToken(data.data)
    }
    res.json(data)

  } catch(error) {
    logger.error(error)
    res.status(500).json('登录出错')
  }
})

function issueToken(data) {
  return jwt.sign(data, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24 * 7, // n天过期
    algorithm: 'RS256',// 设置算法为 RS256
    issuer: 'Monkey'
  })
}

module.exports = router
