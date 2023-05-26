const fs = require("fs")
const path = require("path")

let PRIVATE_KEY
let PUBLIC_KEY

try {
  PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './secret/private.key'))
  PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './secret/public.key'))
} catch(error) {
  console.log('密钥读取出错，请查看 "/0_doc/2.接口.md" 鉴权章节重新生成', error.message)
}

let MD5_SALT //字符串 如：'jwfkllskd'
let REGISTRY_INVITATION_CODE //字符串数字 如：'7355608'
let SMMS_TOKEN //访问 https://sm.ms/home/apitoken 获取你的token
try {
  MD5_SALT = fs.readFileSync(path.resolve(__dirname, './secret/md5_salt')).toString()
  REGISTRY_INVITATION_CODE = fs.readFileSync(path.resolve(__dirname, './secret/registry_invitation_code')).toString()
  SMMS_TOKEN = fs.readFileSync(path.resolve(__dirname, './secret/SMMS_token')).toString()
} catch(error) {
  console.log('盐或邀请码或"SMMS token"读取出错，请直接填写或新建文本', error.message)
}
console.log( MD5_SALT)
console.log(REGISTRY_INVITATION_CODE)
console.log(SMMS_TOKEN)
module.exports = {
  MD5_SALT,
  REGISTRY_INVITATION_CODE,
  PRIVATE_KEY,
  PUBLIC_KEY,
  SMMS_TOKEN
}
