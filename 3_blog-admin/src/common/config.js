let BLOG_URL = '' //博客前端的地址（非后台管理地址）

if(process.env.NODE_ENV === 'development') {
  BLOG_URL = 'http://localhost:3000'
} else {
  BLOG_URL = 'http://150.158.168.128:3000'
}

export {
  BLOG_URL,
}