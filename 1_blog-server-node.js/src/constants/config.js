const fs = require("fs")
const path = require("path")
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './public.key'))



const MD5_SALT = 'jwfkllskd';
const REGISTRY_INVITATION_CODE = '7355608'


module.exports = {
  MD5_SALT,
  REGISTRY_INVITATION_CODE,
  PRIVATE_KEY,
  PUBLIC_KEY
}
