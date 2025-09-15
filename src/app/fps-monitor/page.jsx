'use client'

import React, { useCallback, useEffect, useRef, useState } from "react"

const FPSMonitor = () => {
  const [fps, setFPS] = useState(0)
  const timeRef = useRef(performance.now())
  const countRef = useRef(0)
  const rafRef = useRef(null)

  const calculate = useCallback((now) => {
    if (now - timeRef.current < 1000) {
      countRef.current = countRef.current + 1
    } else {
      setFPS(countRef.current)
      countRef.current = 0
      timeRef.current = now
    }

    rafRef.current = requestAnimationFrame(calculate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(calculate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return <div>
    FPS: {fps}
  </div>
}

export default FPSMonitor