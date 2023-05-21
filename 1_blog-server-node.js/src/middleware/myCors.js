// 允许信任url跨域
const myCors = ((req, res, next) => {
  const trustList = ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://47.108.195.109:80']
  const origin = req.headers.origin
  if(trustList.indexOf(origin) > -1) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Headers', 'Authorization,Origin,X-Requested-With,Content-Type,Accept')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('Content-Type', 'application/json; charset=utf-8')
  }
  next()
})

module.exports = myCors