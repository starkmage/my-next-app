'use client'

import React, { useEffect, useRef, useState } from "react"

const FPSMonitor = () => {
  const [fps, setFps] = useState(0)
  const rafRef = useRef(null)
  const frameRef = useRef(0)
  const lastTimeRef = useRef(performance.now())

  const calculateFps = (timeStamp) => {
    frameRef.current++

    if (timeStamp - lastTimeRef.current >= 1000) {
      setFps(frameRef.current)
      frameRef.current = 0
      lastTimeRef.current = timeStamp
    }

    rafRef.current = requestAnimationFrame(calculateFps)
  }

  useEffect(() => {
    rafRef.current = requestAnimationFrame(calculateFps)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return <div>FPS: {fps}</div>
}

export default FPSMonitor