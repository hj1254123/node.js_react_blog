const crypto = require('crypto');
const { MD5_SALT } = require('../constants/config')

const md5password = (password) => {
  const md5 = crypto.createHash('md5')
  const result = md5.update(password + MD5_SALT).digest('hex')
  return result
}

module.exports = {
  md5password
}
