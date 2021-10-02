const fs = require("fs")
const path = require("path")
const xss = require("xss")

const userDBPath = path.resolve(__dirname, '../db/user.json')
const utilsAuthPath = path.resolve(__dirname, '../utils/auth_handle.js')

const { md5password } = require(utilsAuthPath)

const userController = {}

userController.createUser = (userName, password, invitationCode, callback) => {
  // err为true表示失败，data带给客户端的数据。
  let err = null
  let data = null
  // 校验用户名、密码的合法性
  let cleanUserName = xss(userName)
  let cleanPassword = xss(password)
  // 长度控制
  let checkUserName = 6 <= cleanUserName.length && cleanUserName.length < 16
  let checkPassword = 6 <= cleanPassword.length && cleanPassword.length < 16
  // 查询数据库，用户名是否存在
  let checkUserRepeat = true
  let usersData = JSON.parse(fs.readFileSync(userDBPath))
  usersData.forEach(item => {
    if(item.userName === userName) {
      checkUserRepeat = false
    }
  })
  // 不同错误状态处理
  if(!checkUserName) {
    err = { message: '用户名不合法，长度6-16' }
  } else if(!checkPassword) {
    err = { message: '密码不合法，长度6-16' }
  } else if(!checkUserRepeat) {
    err = { message: '用户名已存在' }
  } else if(invitationCode !== '7355608') {
    err = { message: '邀请码错误' }
  } else {
    // 以上校验通过，注册新用户
    let newUser = {}
    // 计算唯一id
    var onlyID = usersData[usersData.length - 1]
    if(onlyID === undefined) {
      newUser.id = 1
    } else {
      newUser.id = onlyID.id + 1
    }
    // 用户名
    newUser.userName = cleanUserName
    // hash密码
    newUser.hashPassword = md5password(cleanPassword)
    // 当前时间戳
    newUser.time = new Date().getTime()
    // push并写入
    usersData.push(newUser)
    fs.writeFileSync(userDBPath, JSON.stringify(usersData))
    // 待返回给客户端的数据
    data = {
      message: '注册成功',
      data: {
        id: newUser.id,
        userName: newUser.userName
      }
    }
  }

  callback(err, data)
}

module.exports = userController