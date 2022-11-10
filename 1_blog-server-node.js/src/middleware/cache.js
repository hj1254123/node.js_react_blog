// 借助 memory-cache 库，实现接口缓存中间件
const { get, put } = require('memory-cache')

// 参数单位：秒
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = get(key)
    if(cachedBody) {
      res.json(cachedBody)
      return
    } else {
      res.sendResponse = res.json
      res.json = (body) => {
        put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

module.exports = cacheMiddleware
