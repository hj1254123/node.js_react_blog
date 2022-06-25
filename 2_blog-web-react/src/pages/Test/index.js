import React, { memo, useState } from 'react'

const Test = memo(() => {
  const [data, setData] = useState(0)
  if(data > 1) {
    throw 'test出错'
  }
  return (
    <div style={{ height: '90vh', width: '100%', paddingTop: '100px' }}>
      <h2>---开发用,测试页面---</h2>
      <button onClick={() => {
        setData(data + 1)
      }}>{data}</button>
    </div>
  )
})

export default Test