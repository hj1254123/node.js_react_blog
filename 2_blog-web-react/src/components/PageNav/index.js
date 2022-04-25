import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageNavWrapper } from './style'

const PageNav = memo((props) => {
  // currentIndex:由父组件从url获取。total：总共页数。
  let { currentIndex, total } = props
  const navigate = useNavigate()

  // 计算list，根据这两个参数返回不同格式
  function computeListJSX(currentIndex, total) {
    // 根据 currentIndex、total，计算页码。
    // 格式：
    // - [1, '...', 5, 6, 7, 8, 9]
    // - [1, 2, 3, 4, '...', 9]
    // - [1, '...', 3, 4, 5, 6, 7, '...', 9]

    const jsxArr = []

    const pageNumArr = []
    // 计算中间部分（如：5 => 34567）
    for(let i = currentIndex - 2; i <= currentIndex + 2; i++) {
      if(i < 1) continue
      if(i > total) continue
      pageNumArr.push(i)
    }
    // 首部处理（首部追加1 和 是否加...）
    let startItem = pageNumArr[0]
    if(startItem > 2) {
      pageNumArr.unshift('...')
      pageNumArr.unshift(1)
    }
    if(startItem === 2) {
      pageNumArr.unshift(1)
    }
    // 尾部处理（尾部追加 total 和 是否加...）
    let endItem = pageNumArr[pageNumArr.length - 1]
    if(endItem < total - 1) {
      pageNumArr.push('...')
      pageNumArr.push(total)
    }
    if(endItem === total - 1) {
      pageNumArr.push(total)
    }
    // 渲染
    let active = ''
    pageNumArr.forEach((item, index) => {
      active = (currentIndex === item) ? 'active' : ''
      jsxArr.push(
        <li
          onClick={() => { goPage(item) }}
          className={active}
          key={index}
          style={{ pointerEvents: item === '...' ? 'none' : '' }}
        > {item}</li >
      )
    })
    // 添加上一页、下一页按钮
    if(currentIndex > 1) {
      jsxArr.unshift(
        <li
          onClick={() => { goPage(currentIndex - 1) }}
          key='-1'
        >上一页</li>
      )
    }
    if(currentIndex < total) {
      jsxArr.push(
        <li
        onClick={() => { goPage(currentIndex + 1) }}
        key='+1'
      >下一页</li>
      )
    }
    return jsxArr
  }
  // 前往页码
  function goPage(index) {
    document.documentElement.scrollTop = 0
    navigate(`/article/page/${index}`)
  }

  return (
    <PageNavWrapper>
      <ul>
        {computeListJSX(currentIndex, total)}
      </ul>
    </PageNavWrapper>
  )
})

export default PageNav