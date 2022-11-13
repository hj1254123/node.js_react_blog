import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // TODO：上报错误
    // console.log(error)
    // console.log(errorInfo.componentStack)
  }

  render() {
    if(this.state.hasError) {
      return (
        <div>
          <h2>出错了</h2>
          <a href="/">点击返回首页</a>
        </div>
      );
    }
    return this.props.children;
  }
}
