'use client'

import { useCallback } from "react"
import VirtualScroll from "./writing"

const App = () => {
  const dataSource = Array(200).fill(0).map((val, index) => index * 10)

  const renderItem = useCallback((item) => {
    return <p
      style={{
        height: '100%',
        width: '200px',
        border: '2px solid #000000',
      }}
    >
      {item}
    </p>
  }, [])

  return <div
    style={{
      margin: '200px auto',
      width: `300px`
    }}
  >
    <VirtualScroll
      containerHeight={800}
      itemHeight={50}
      renderItem={renderItem}
      dataSource={dataSource}
    />
  </div>
}

export default App