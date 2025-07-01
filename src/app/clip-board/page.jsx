'use client'

import ClipBoard from "./ClipBoard"

const App = () => {
  return <ClipBoard
    text="复制这段话"
    onSuccess={() => console.log("复制成功！")}
  />
}

export default App