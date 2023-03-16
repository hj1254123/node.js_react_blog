let BASE_URL = ''
const TIMEOUT = 10000;
// const imageHosting_URL = 'https://sm.ms/api/v2/' //暂时用sm.ms图床
// npm start 时 process.env.NODE_ENV 总是等于 'development';
// npm test 它总是等于 'test'
// npm run build 它总是等于 'production' 
if(process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3003'
} else {
  BASE_URL = 'http://150.158.168.128:3001'
}

export {
  BASE_URL,
  TIMEOUT,
  // imageHosting_URL
}