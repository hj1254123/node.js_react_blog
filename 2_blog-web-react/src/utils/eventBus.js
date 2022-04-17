import { EventEmitter } from 'events'

const eventBus = new EventEmitter()

// 用于改变网络请求次数；
// - 在 requset 中请求+1 请求完毕-1；
// - 在 loading 组件中通过判断数字，决定是否显示加载动画；
// - 因为无需取消订阅，故不封装；
function EmitRequestNumberChange(n) {
  eventBus.emit('countChange', n)
}

function onRequestCountChange(callback) {
  eventBus.on('countChange', (n) => {
    callback && callback(n)
  })
}

export {
  EmitRequestNumberChange,
  onRequestCountChange,
}
