'use client'

import React, { useCallback, useEffect, useRef, useState } from "react"

const FPSMonitor = () => {
  const [fps, setFPS] = useState(0)
  let counterRef = useRef(0)
  let rafRef = useRef(null)
  let lastTime = useRef(performance.now())

  const calculateFPS = useCallback((timeStamp) => {
    if (timeStamp - lastTime.current < 1000) {
      counterRef.current++
    } else {
      setFPS(counterRef.current)
      counterRef.current = 0
      lastTime.current = timeStamp
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
  }, [])

  return <div>FPS: {fps}</div>
}

export default FPSMonitor