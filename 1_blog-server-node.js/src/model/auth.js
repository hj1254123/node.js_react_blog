const fs = require("fs")
const path = require("path")
const xss = require("xss")

const authModel = {}
module.exports = authModel

const { md5password } = require('../utils/auth_handle.js')
const { REGISTRY_INVITATION_CODE } = require('../constants/config')

const userDBPath = path.resolve(__dirname, '../db/user.json')

// 记录ip，及对应的密码错误次数
const visitorIp = {}

// 限制单个ip单日密码尝试次数
function preventViolentCrackPassword(ip) {
  // ip未记录，直接通过
  if(!visitorIp[ip]) {
    return '通过'
  }
  const max = visitorIp[ip].max// 密码单日最多尝试次数
  // 检查记录的时间是否是今天
  const oldTime = new Date(visitorIp[ip].time)
  const oldDate = oldTime.getFullYear() + '/' + (oldTime.getMonth() + 1) + '/' + oldTime.getDay()
  const time = new Date()
  const date = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDay()
  // 如果是同一天检查错误次数
  const o = visitorIp[ip]
  if(oldDate === date) {
    if(!o.count || o.count + 1 >= max) {
      return '未通过'
    }
  } else {
    // 超过一天清空错误计数
    o.count = 0
  }
  return '通过'
}

authModel.getUsersData = () => {
  return usersData = JSON.parse(fs.readFileSync(userDBPath))
}

authModel.save = (usersData) => {
  fs.writeFileSync(userDBPath, JSON.stringify(usersData))
}

authModel.register = (userName, password, invitationCode) => {
  const data = {
    message: '',
    data: {}
  }
  // - 用户名、密码数据类型校验
  const isCheckUserType = checkUserType(userName, password)
  if(!isCheckUserType) {
    data.message = '用户名或密码类型必须为String'
    return data
  }
  // - 长度、用户名重复、邀请码校验
  const { checkUserNameLength, checkPasswordLength } = checkUserLength(userName, password)

  // 查询数据库，用户名是否重复
  let checkUserRepeat = true
  let usersData = authModel.getUsersData()
  usersData.forEach(item => {
    if(item.userName === userName) {
      checkUserRepeat = false
    }
  })
  // 检查邀请码
  let checkInvitationCode = invitationCode === REGISTRY_INVITATION_CODE
  // 校验失败的响应消息
  if(!checkUserNameLength) {
    data.message += '用户名长度必须在6-15 '
  }
  if(!checkPasswordLength) {
    data.message += '密码长度必须在6-15 '
  }
  if(!checkUserRepeat) {
    data.message += '用户名已存在 '
  }
  if(!checkInvitationCode) {
    data.message += '邀请码错误 '
  }
  const c = checkUserNameLength && checkPasswordLength
    && checkUserRepeat && checkInvitationCode
  if(!c) {
    return data
  }

  // - 以上校验通过，注册新用户
  let newUser = {}
  // 计算唯一id
  let lastItem = usersData[usersData.length - 1]
  if(lastItem === undefined) {
    newUser.id = 1
  } else {
    newUser.id = lastItem.id + 1
  }
  // 用户名
  newUser.userName = xss(userName)
  // hash密码
  newUser.hashPassword = md5password(password)
  // 当前时间戳
  newUser.time = new Date().getTime()
  // push并写入
  usersData.push(newUser)
  authModel.save(usersData)
  // 待返回给客户端的数据
  data.message = '注册成功'
  data.data = {
    id: newUser.id,
    userName: newUser.userName,
    time: newUser.time
  }
  return data
}

authModel.login = (userName, password, ip) => {
  const data = {
    message: '',
    data: {}
  }
  // - 用户名、密码数据类型校验
  const isCheckUserType = checkUserType(userName, password)
  if(!isCheckUserType) {
    data.message = '用户名或密码类型必须为String'
    return data
  }

  // 根据访问者ip，检查密码错误次数是否通过
  const result = preventViolentCrackPassword(ip)
  if(result === '未通过') {
    data.message = '密码错误次数过多，请明日再试！'
    return data
  }
  // 读取用户数据
  const usersData = authModel.getUsersData()
  // 查找用户是否存在，并校验。
  for(let i = 0; i < usersData.length; i++) {
    const item = usersData[i]
    if(item.userName === userName) {
      if(item.hashPassword === md5password(password)) {
        data.message = '登录成功'
        data.data = {
          id: item.id,
          userName: item.userName,
          time: item.time
        }
        // - 密码正确，如果记录了访问者ip，将错误次数清零
        if(visitorIp[ip]) {
          const o = visitorIp[ip]
          o.count = 0
        }
        return data
      } else {
        // - 密码错误，记录访问者ip和时间戳，错误次数+1
        // 没有记录初始化
        if(!visitorIp[ip]) {
          visitorIp[ip] = {
            time: new Date(),
            max: 5, //最大密码错误尝试次数
            count: 0
          }
        }
        const o = visitorIp[ip]
        o.count = o.count + 1
        data.message = `密码错误，今日还可尝试${o.max - o.count}`
        return data
      }
    }
  }
  data.message = '没有该用户'
  return data
}

// 工具函数

function checkUserType(userName, password) {
  const a = (typeof userName) === 'string'
  const b = (typeof password) === 'string'
  return a && b
}

function checkUserLength(userName, password) {
  // 长度控制
  const checkUserNameLength = (6 <= userName.length) && (userName.length <= 15)
  const checkPasswordLength = (6 <= password.length) && (password.length <= 15)

  return {
    checkUserNameLength, checkPasswordLength
  }
}
