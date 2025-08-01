'use client'

import { useCallback } from "react"
import { MessageContainer, Message } from "./writing"

const App = () => {
  const showMessage = useCallback(() => {
    Message.info('test', 2000)
  }, [])

  return <>
    <MessageContainer />
    <p onClick={showMessage}>Click</p>
  </>
}

export default App