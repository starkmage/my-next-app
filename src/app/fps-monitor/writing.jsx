'use client'

import { useCallback, useEffect, useRef, useState } from "react"

const FpsMonitor = () => {
  const [fps, setFPS] = useState(0)

  const rafRef = useRef(null)
  const countRef = useRef(0)
  const timeRef = useRef(performance.now())

  const calculateFPS = useCallback((time) => {
    if (time - timeRef.current <= 1000) {
      countRef.current++
    } else {
      setFPS(countRef.current)
      countRef.current = 0
      timeRef.current = time
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
      {`FPS is: ${fps}`}
    </div>
  )
}

export default FpsMonitor