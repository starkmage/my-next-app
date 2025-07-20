'use client'

import { useCallback, useRef, useState } from "react"

const Drag = ({ children }) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })
  const containerRef = useRef(null)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) {
      return
    }

    requestAnimationFrame(() => {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y
      })
    })
  }, [])

  const onMouseDown = (e) => {
    const rect = containerRef.current.getBoundingClientRect()

    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }

    dragging.current = true

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }


  const onMouseUp = useCallback(() => {
    dragging.current = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }, [])

  return <div
    style={{
      cursor: 'move',
      position: 'absolute',
      left: position.x,
      top: position.y,
      userSelect: 'none'
    }}
    onMouseDown={onMouseDown}
    ref={containerRef}
  >
    {children}
  </div>
}

export default Drag