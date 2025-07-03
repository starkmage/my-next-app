'use client'

import { useRef, useState } from "react"

const Drag = ({ children }) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })

  const mouseOffsetOfDom = useRef(null)
  const domRef = useRef(null)
  const dragging = useRef(false)

  const onMouseDown = (e) => {
    dragging.current = true
    const domInfo = domRef.current.getBoundingClientRect()
    mouseOffsetOfDom.current = {
      left: e.clientX - domInfo.left,
      top: e.clientY - domInfo.top,
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e) => {
    if (!dragging.current) {
      return 
    }
    requestAnimationFrame(() => {
      setPosition({
        x: e.clientX - mouseOffsetOfDom.current.left,
        y: e.clientY - mouseOffsetOfDom.current.top
      })
    })
  }

  const onMouseUp = () => {
    dragging.current = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  return <div
    style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
      userSelect: 'none',
      cursor: 'move'
    }}
    ref={domRef}
    onMouseDown={onMouseDown}
  >
    {children}
  </div>
}

export default Drag