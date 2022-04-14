// 节流函数
export function throttle(fn, gapTime) {
  var _lastTime = null
  return function() {
    var context = this
    var args = arguments
    var _nowTime = + new Date()
    if(_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(context, args)
      _lastTime = _nowTime
    }
  }
}

// 防抖函数
export function debounce(fn, wait) {
  var timer = null
  return function() {
    var context = this
    var args = arguments
    if(timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, wait)
  }
}

// 返回页面顶部
// - 较新版本浏览器使用 behavior: "smooth" 方式
// - 其他使用 js 模拟
// - 兼容ie10+
export function goTop() {
  if(typeof window.getComputedStyle(document.body).scrollBehavior === 'undefined') {
    // 兼容代码
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop || 0
    function go() {
      if(scrollTop < 2) {
        document.documentElement.scrollTop = 0
        return
      }
      scrollTop = scrollTop * 0.9 //滚动速率
      document.documentElement.scrollTop = scrollTop
      requestAnimationFrame(go)
    }
    requestAnimationFrame(go)
  } else {
    // 浏览器实现，性能更佳。
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
}
