'use client'

import React, { useCallback, useEffect, useRef, useState } from "react"

const FPSMonitor = () => {
  const [fps, setFPS] = useState(0)
  const lastTime = useRef(performance.now())
  const counter = useRef(0)
  const rafRef = useRef(null)

  const calculateFPS = useCallback((time) => {
    if (time - lastTime.current < 1000) {
      counter.current++
    } else {
      setFPS(counter.current)
      lastTime.current = time
      counter.current = 0
    }

    rafRef.current = requestAnimationFrame(calculateFPS)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(calculateFPS)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [calculateFPS])

  return (
    <div>
      FPS is: {fps}
    </div>
  )
}

export default FPSMonitor