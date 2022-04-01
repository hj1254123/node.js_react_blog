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