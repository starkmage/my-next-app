'use client'

import { useCallback, useState } from "react"
import Modal from "./writing"


const App = () => {

  const [isOpen, setIsOpen] = useState(false)

  const onClose = useCallback(() => {
    setIsOpen(false)
  })

  return (
    <>
      <div
        style={{
          cursor: 'pointer'
        }}
        onClick={() => setIsOpen(true)}>
        Open Modal
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <p>this is a modal</p>
        <p>you can close it by click x or mask</p>
      </Modal>
    </>

  )
}

export default App