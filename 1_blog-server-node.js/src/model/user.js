const fs = require("fs")
const path = require("path")
const xss = require("xss")

const userDBPath = path.resolve(__dirname, '../db/user.json')

const { md5password } = require('../utils/auth_handle.js')
const { REGISTRY_INVITATION_CODE } = require('../constants/config')

const userController = {}

userController.getUsersData = () => {
  return usersData = JSON.parse(fs.readFileSync(userDBPath))
}

userController.save = (usersData) => {
  fs.writeFileSync(userDBPath, JSON.stringify(usersData))
}

userController.cleanUserNameAndPassword = (userName, password) => {
  // 校验用户名、密码的合法性
  let cleanUserName = xss(userName)
  let cleanPassword = xss(password)
  // 长度控制
  let checkUserName = 6 <= cleanUserName.length && cleanUserName.length < 16
  let checkPassword = 6 <= cleanPassword.length && cleanPassword.length < 16
  return { cleanUserName, cleanPassword, checkUserName, checkPassword }
}

userController.createUser = async (userName, password, invitationCode) => {
  let message = '注册成功'
  let data = null
  let {
    cleanUserName,
    cleanPassword,
    checkUserName,
    checkPassword
  } = userController.cleanUserNameAndPassword(userName, password)

  // 查询数据库，用户名是否重复
  let checkUserRepeat = true
  let usersData = await userController.getUsersData()
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
    var uniqueId = usersData[usersData.length - 1]
    if(uniqueId === undefined) {
      newUser.id = 1
    } else {
      newUser.id = uniqueId.id + 1
    }
    // 用户名
    newUser.userName = cleanUserName
    // hash密码
    newUser.hashPassword = md5password(cleanPassword)
    // 当前时间戳
    newUser.time = new Date().getTime()
    // push并写入
    usersData.push(newUser)
    userController.save(usersData)
    // 待返回给客户端的数据
    message = '注册成功'
    data = {
      id: newUser.id,
      userName: newUser.userName
    }
  }

  return { message, data }
}

userController.userNamePasswordAuth = async (userName, password) => {
  let {
    cleanUserName,
    cleanPassword,
    checkUserName,
    checkPassword
  } = userController.cleanUserNameAndPassword(userName, password)
  
  let message = '没有该用户'
  let data = {}
  // 读取用户数据
  const usersData = await userController.getUsersData()
  // 查找用户是否存档，并校验。
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
      } else {
        message = '密码错误'
      }
      break
    }
  }
  return { message, data }
}

module.exports = userController