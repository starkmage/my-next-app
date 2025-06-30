'use client'

import { useCallback, useState } from "react"
import Modal from "./Modal"


const App = () => {

  const [isOpen, setIsOpen] = useState(false)

  const onClose = useCallback(() => {
    setIsOpen(false)
  })

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
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