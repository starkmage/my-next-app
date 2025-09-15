'use client'

import React, { useState, memo, useMemo, useCallback, useEffect, useRef } from 'react';

const App = () => {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  const stepRef = useRef(step)

  useEffect(() => {
    stepRef.current = step
  }, [step])

  useEffect(() => {
    setInterval(() => {
      setCount((preCount) => {
        return preCount + stepRef.current
      })
    }, 1000)
  }, [])

  return (
    <div>
      <div>{count}</div>
      <div>
        <input type="text" value={step} onChange={(e) => setStep(Number(e.target.value))} />
      </div>
    </div>
  )
}

export default App