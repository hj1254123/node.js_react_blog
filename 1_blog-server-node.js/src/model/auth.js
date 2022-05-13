const fs = require("fs")
const path = require("path")
const xss = require("xss")

const userDBPath = path.resolve(__dirname, '../db/user.json')

const { md5password } = require('../utils/auth_handle.js')
const { REGISTRY_INVITATION_CODE } = require('../constants/config')

const authModel = {}

// 记录ip，及对应的密码错误次数
const visitorIp = {}

// 限制单个ip单日密码尝试次数
function preventViolentCrackPassword(ip) {
  const max = 10 // 密码单日最多尝试次数
  // ip未记录，直接通过
  if(!visitorIp[ip]) {
    return '通过'
  }
  // 检查记录的时间是否是今天
  const oldTime = new Date(visitorIp[ip].time)
  const oldDate = oldTime.getFullYear() + '/' + (oldTime.getMonth() + 1) + '/' + oldTime.getDay()
  const time = new Date()
  const date = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDay()
  // 如果是同一天检查错误次数
  const o = visitorIp[ip]
  if(oldDate === date) {
    if(!o.count || o.count >= max) {
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

authModel.cleanUserNameAndPassword = (userName, password) => {
  // TODO：用户名的非法字符过滤
  let cleanUserName = xss(userName)
  let cleanPassword = password
  // 长度控制
  let checkUserName = 6 <= cleanUserName.length && cleanUserName.length < 16
  let checkPassword = 6 <= cleanPassword.length && cleanPassword.length < 16
  return { cleanUserName, cleanPassword, checkUserName, checkPassword }
}

authModel.createUser = async (userName, password, invitationCode) => {
  let message = '注册成功'
  let data = null
  let {
    cleanUserName,
    cleanPassword,
    checkUserName,
    checkPassword
  } = authModel.cleanUserNameAndPassword(userName, password)

  // 查询数据库，用户名是否重复
  let checkUserRepeat = true
  let usersData = await authModel.getUsersData()
  usersData.forEach(item => {
    if(item.userName === userName) {
      checkUserRepeat = false
    }
  })
  // 不同错误状态处理
  if(!checkUserName) {
    message = '用户名不合法，长度6-16'
  } else if(!checkPassword) {
    message = '密码不合法，长度6-16'
  } else if(!checkUserRepeat) {
    message = '用户名已存在'
  } else if(invitationCode !== REGISTRY_INVITATION_CODE) {
    message = '邀请码错误'
  } else {
    // 以上校验通过，注册新用户
    let newUser = {}
    // 计算唯一id
    let lastItem = usersData[usersData.length - 1]
    if(lastItem === undefined) {
      newUser.id = 1
    } else {
      newUser.id = lastItem.id + 1
    }
    // 用户名
    newUser.userName = cleanUserName
    // hash密码
    newUser.hashPassword = md5password(cleanPassword)
    // 当前时间戳
    newUser.time = new Date().getTime()
    // push并写入
    usersData.push(newUser)
    authModel.save(usersData)
    // 待返回给客户端的数据
    message = '注册成功'
    data = {
      id: newUser.id,
      userName: newUser.userName
    }
  }

  return { message, data }
}

authModel.userNamePasswordAuth = async (userName, password, ip) => {
  let {
    cleanUserName,
    cleanPassword,
  } = authModel.cleanUserNameAndPassword(userName, password)

  let message = '没有该用户'
  let data = {}
  // 根据访问者ip，检查密码错误次数是否通过
  const result = preventViolentCrackPassword(ip)
  if(result === '未通过') {
    return { message: '密码错误次数过多，请明日再试！', data }
  }
  // 读取用户数据
  const usersData = await authModel.getUsersData()
  // 查找用户是否存在，并校验。
  for(let i = 0; i < usersData.length; i++) {
    const item = usersData[i]
    if(item.userName === cleanUserName) {
      if(item.hashPassword === md5password(cleanPassword)) {
        message = '登录成功'
        data = {
          id: item.id,
          userName: item.userName,
          time: item.time
        }
        // - 密码正确，如果记录了访问者ip，将错误次数清零
        if(visitorIp[ip]) {
          const o = visitorIp[ip]
          o.count = 0
        }
      } else {
        message = '密码错误'
        // - 密码错误，记录访问者ip和时间戳，错误次数+1
        // 没有记录初始化
        if(!visitorIp[ip]) {
          visitorIp[ip] = {
            time: new Date(),
            count: 1
          }
        }
        const o = visitorIp[ip]
        o.count = o.count + 1
      }
      break
    }
  }
  return { message, data }
}

module.exports = authModel