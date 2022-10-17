import { memo } from 'react';

const Test = memo(() => {
  return (
    <div style={{ minHeight: '90vh', paddingTop: '80px' }}>
      <h2>Test 页面</h2>
    </div>
  )
})

export default Test