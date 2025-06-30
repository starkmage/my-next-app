'use client'

import { useCallback, useEffect, useRef, useState, } from "react"

const DebouncedButton = (props = {}) => {
  const {
    text = 'Click',
    delay = 5000,
    onClick = () => { console.log('click') }
  } = props

  const [disabled, setDisabled] = useState(false)
  const timerRef = useRef(null)

  const debouncedClick = useCallback(() => {
    if (disabled) {
      return
    }
    setDisabled(true)
    onClick()

    timerRef.current = setTimeout(() => {
      setDisabled(false)
    }, delay)
  }, [delay, onClick])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return <button
    disabled={disabled}
    style={{
      width: '200px',
      height: '100px',
      border: '1px solid #000000',
      cursor: disabled ? 'not-allowed' : 'pointer',
    }}
    onClick={debouncedClick}>
    {disabled ? 'Processing' : text}
  </button>
}

export default DebouncedButton