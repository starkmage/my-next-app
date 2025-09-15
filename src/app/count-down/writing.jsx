'use client';

import { useEffect, useRef, useState } from "react";

const formatSeconds = (seconds) => {
  console.log(seconds)
  const m = Math.floor(seconds / 60)
  const s = seconds % 60

  return `${m} minutes ${s} seconds`
}

const CountDown = ({ initialSeconds }) => {
  const [lastSeconds, setLastSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(false)
  const timerRef = useRef(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const handleToggle = () => {
    if (isActive) {
      clearTimer()
      setIsActive(false)
    } else {
      timerRef.current = setInterval(() => {
        setLastSeconds((prev) => {
          if (prev > 1) {
            return prev - 1
          } else {
            clearInterval(timerRef.current)
            return 0
          }
        })
      }, 1000)
      setIsActive(true)
    }
  }

  const handleReset = () => {
    if (isActive.current) {
      clearTimer()
      setIsActive(false)
    }
    setLastSeconds(initialSeconds)
  }

  useEffect(() => {
    return () => {
      clearTimer()
    }
  }, [])

  return (
    <div>
      <div>
        {formatSeconds(lastSeconds)}
      </div>
      <div
      style={{
        display: 'flex',
        gap: '12px'
      }}
      >
        <button
          onClick={handleToggle}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
        >Reset</button>
      </div>
    </div>
  )
}

export default CountDown