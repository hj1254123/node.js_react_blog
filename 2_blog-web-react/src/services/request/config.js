let BASE_URL = ''
const TIMEOUT = 10000;

// npm start 时 process.env.NODE_ENV 总是等于 'development';
// npm test 它总是等于 'test'
// npm run build 它总是等于 'production' 
if(process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3001'
} else {
  BASE_URL = 'https://blog.hou-jian.com'
}

export {
  BASE_URL,
  TIMEOUT
}