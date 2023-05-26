// 应用日志
const log4js = require('log4js')
const path = require('path')

console.log('Loading logger module...') 

const appLogPath = path.join(__dirname, '../logs/app.log')

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: appLogPath }
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'debug' }
  }
})

const logger = log4js.getLogger()

process.on('exit', () => {
  log4js.shutdown(() => {
    console.log('Logger 日志模块已成功关闭.')
  })
})

module.exports = logger

