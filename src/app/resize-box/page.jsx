'use client'

import ResizableBox from "./ResizableBox"

const App = () => {
  return <ResizableBox>
    <div style={{ background: '#eee', height: '100%' }}>
      我是可缩放的内容
    </div>
  </ResizableBox>
}

export default App