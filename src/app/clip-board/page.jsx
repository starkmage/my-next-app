'use client'

import { useRef } from "react"
import ClipBoard from "./writing"

const App = () => {
  const domRef = useRef(null)

  return (<>
    <div ref={domRef}>
      Copy Content of this dom
      <p>by our component</p>
    </div>
    <ClipBoard
      // text="复制这段话"
      domRef={domRef}
      onSuccess={() => console.log("复制成功！")}
    />
  </>)
}

  export default App