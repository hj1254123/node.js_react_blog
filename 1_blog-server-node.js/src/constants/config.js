const fs = require("fs")
const path = require("path")

let PRIVATE_KEY
let PUBLIC_KEY

// TODO:项目上线时重新生成
try {
  PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './private.key'))
  PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './public.key'))
} catch(error) {
  console.log('密钥读取出错：', error.message);
}

// TODO:项目上线时修改
const MD5_SALT = 'jwfkllskd';
const REGISTRY_INVITATION_CODE = '7355608'


module.exports = {
  MD5_SALT,
  REGISTRY_INVITATION_CODE,
  PRIVATE_KEY,
  PUBLIC_KEY
}
