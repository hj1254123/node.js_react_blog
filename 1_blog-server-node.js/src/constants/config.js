const fs = require("fs")
const path = require("path")

let PRIVATE_KEY
let PUBLIC_KEY

// TODO:项目上线时修改这些数据
try {
  PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './private.key'))
  PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './public.key'))
} catch(error) {
  console.log('密钥读取出错，请查看 "/0_doc/2.接口.md" 鉴权章节重新生成', error.message)
}
const MD5_SALT = 'jwfkllskd'
const REGISTRY_INVITATION_CODE = '7355608'
const SMMS_TOKEN = 'lpxm1o2HK2GNGjaj7j31At3YxuYWRpJb' //访问 https://sm.ms/home/apitoken 获取你的token

module.exports = {
  MD5_SALT,
  REGISTRY_INVITATION_CODE,
  PRIVATE_KEY,
  PUBLIC_KEY,
  SMMS_TOKEN
}
